import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import { upload } from './config/cloudinary.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Configuration CORS sécurisée
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://leadertgn.me', // Ton domaine
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS non autorisé'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Mécanisme pour empêcher Render de s'endormir (Ping toutes les 14 min)
const PORT = process.env.PORT || 5000;
const SELF_URL = process.env.BACKEND_URL;

if (SELF_URL) {
  setInterval(async () => {
    try {
      await fetch(`${SELF_URL}/api/projects`);
      console.log('Self-ping success: Staying awake!');
    } catch (e) {
      console.error('Self-ping error:', e.message);
    }
  }, 10 * 60 * 1000);
}

// Logger de requêtes avancé
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`\n[${new Date().toISOString()}] 🚀 ${req.method} ${req.url}`);
  if (req.method !== 'GET' && Object.keys(req.body || {}).length > 0) {
    console.log('📦 Body:', req.body);
  }
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] 🏁 ${req.method} ${req.url} - Status: ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Middleware d'authentification Google avec Whitelisting
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn(`[Auth] Rejeté: Pas de token Bearer fourni`);
    return res.status(401).json({ error: 'Non authentifié' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase();

    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    if (email !== adminEmail) {
      console.warn(`[Auth] Rejeté: Email non autorisé (${email} != ${adminEmail})`);
      return res.status(403).json({ error: 'Accès refusé' });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error(`[Auth] Erreur de vérification du token:`, error.message);
    return res.status(401).json({ error: 'Token invalide' });
  }
};

// --- ROUTES PUBLIQUES ---

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: { skills: true },
      orderBy: { order: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// --- ROUTES PROTÉGÉES (ADMIN) ---

// --- PROJETS ---
app.post('/api/admin/projects', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, links, stack, caseStudy, order } = req.body;
    
    // Parse JSON en toute sécurité
    let parsedTitle, parsedDescription, parsedLinks, parsedStack, parsedCaseStudy;
    try {
      parsedTitle = JSON.parse(title);
      parsedDescription = JSON.parse(description);
      parsedLinks = JSON.parse(links);
      parsedStack = JSON.parse(stack);
      parsedCaseStudy = caseStudy ? JSON.parse(caseStudy) : null;
    } catch (parseError) {
      console.error('Erreur de parsing JSON (Création Projet):', parseError);
      return res.status(400).json({ error: 'Données mal formées (JSON invalide)' });
    }

    const project = await prisma.project.create({
      data: {
        title: parsedTitle,
        description: parsedDescription,
        links: parsedLinks,
        stack: parsedStack,
        caseStudy: parsedCaseStudy,
        image: req.file ? (req.file.secure_url || req.file.url || req.file.path) : '',
        order: parseInt(order) || 0,
      },
    });
    res.json(project);
  } catch (error) {
    console.error('Erreur serveur (Création Projet):', error);
    res.status(500).json({ error: 'Erreur lors de la création du projet' });
  }
});

app.put('/api/admin/projects/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, links, stack, caseStudy, order } = req.body;
    
    let parsedTitle, parsedDescription, parsedLinks, parsedStack, parsedCaseStudy;
    try {
      parsedTitle = JSON.parse(title);
      parsedDescription = JSON.parse(description);
      parsedLinks = JSON.parse(links);
      parsedStack = JSON.parse(stack);
      parsedCaseStudy = caseStudy ? JSON.parse(caseStudy) : null;
    } catch (parseError) {
      console.error('Erreur de parsing JSON (Update Projet):', parseError);
      return res.status(400).json({ error: 'Données mal formées (JSON invalide)' });
    }

    const updateData = {
      title: parsedTitle,
      description: parsedDescription,
      links: parsedLinks,
      stack: parsedStack,
      caseStudy: parsedCaseStudy,
      order: parseInt(order) || 0,
    };

    if (req.file) {
      updateData.image = req.file.secure_url || req.file.url || req.file.path;
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(project);
  } catch (error) {
    console.error('Erreur serveur (Update Projet):', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

app.delete('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Projet supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// --- SKILLS ---
app.post('/api/admin/skills/categories', authMiddleware, async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      return res.status(400).json({ error: 'Le nom de la catégorie est requis' });
    }
    const category = await prisma.skillCategory.create({ data: req.body });
    res.json(category);
  } catch (error) {
    console.error('Erreur serveur (Création Catégorie):', error);
    res.status(500).json({ error: 'Erreur creation catégorie' });
  }
});

app.post('/api/admin/skills', authMiddleware, async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.categoryId) {
      return res.status(400).json({ error: 'Données manquantes (nom ou categoryId)' });
    }
    const skill = await prisma.skill.create({ data: req.body });
    res.json(skill);
  } catch (error) {
    console.error('Erreur serveur (Création Compétence):', error);
    res.status(500).json({ error: 'Erreur creation compétence' });
  }
});

app.delete('/api/admin/skills/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
});

app.delete('/api/admin/skills/categories/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.skillCategory.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur suppression catégorie' });
  }
});

// --- TESTIMONIALS ---
app.post('/api/admin/testimonials', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, role, content, order } = req.body;
    let parsedRole, parsedContent;
    try {
      parsedRole = role ? JSON.parse(role) : null;
      parsedContent = JSON.parse(content);
    } catch (e) { return res.status(400).json({ error: 'JSON invalide' }); }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role: parsedRole,
        content: parsedContent,
        image: req.file ? (req.file.secure_url || req.file.url || req.file.path) : '',
        order: parseInt(order) || 0
      }
    });
    res.json(testimonial);
  } catch (error) { res.status(500).json({ error: 'Erreur création témoignage' }); }
});

app.put('/api/admin/testimonials/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, role, content, order } = req.body;
    let parsedRole, parsedContent;
    try {
      parsedRole = role ? JSON.parse(role) : null;
      parsedContent = JSON.parse(content);
    } catch (e) { return res.status(400).json({ error: 'JSON invalide' }); }

    const updateData = {
      name,
      role: parsedRole,
      content: parsedContent,
      order: parseInt(order) || 0
    };
    if (req.file) updateData.image = req.file.secure_url || req.file.url || req.file.path;

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data: updateData
    });
    res.json(testimonial);
  } catch (error) { res.status(500).json({ error: 'Erreur update témoignage' }); }
});

app.delete('/api/admin/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Supprimé' });
  } catch (error) { res.status(500).json({ error: 'Erreur suppression' }); }
});

// --- SERVICES ---
app.post('/api/admin/services', authMiddleware, async (req, res) => {
  try {
    if (!req.body || !req.body.title || !req.body.description || !req.body.icon) {
      return res.status(400).json({ error: 'Données incomplètes' });
    }
    const service = await prisma.service.create({ data: req.body });
    res.json(service);
  } catch (error) { res.status(500).json({ error: 'Erreur création service' }); }
});

app.put('/api/admin/services/:id', authMiddleware, async (req, res) => {
  try {
    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(service);
  } catch (error) { res.status(500).json({ error: 'Erreur update service' }); }
});

app.delete('/api/admin/services/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Supprimé' });
  } catch (error) { res.status(500).json({ error: 'Erreur suppression' }); }
});

app.get('/api/admin/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('\n❌ ERREUR GLOBALE INTERCEPTÉE:', err.stack || err);
  res.status(500).json({ error: 'Une erreur interne est survenue', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
