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

app.use(cors());
app.use(express.json());

// Middleware d'authentification Google avec Whitelisting
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const email = payload.email;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    req.user = payload;
    next();
  } catch (error) {
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

// --- ROUTES PROTÉGÉES (ADMIN) ---

// --- PROJETS ---
app.post('/api/admin/projects', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, links, stack, order } = req.body;
    
    const project = await prisma.project.create({
      data: {
        title: JSON.parse(title),
        description: JSON.parse(description),
        links: JSON.parse(links),
        stack: JSON.parse(stack),
        image: req.file ? req.file.path : '',
        order: parseInt(order) || 0,
      },
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

app.put('/api/admin/projects/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, links, stack, order } = req.body;
    
    const updateData = {
      title: JSON.parse(title),
      description: JSON.parse(description),
      links: JSON.parse(links),
      stack: JSON.parse(stack),
      order: parseInt(order) || 0,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json(project);
  } catch (error) {
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
    const category = await prisma.skillCategory.create({ data: req.body });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur creation catégorie' });
  }
});

app.post('/api/admin/skills', authMiddleware, async (req, res) => {
  try {
    const skill = await prisma.skill.create({ data: req.body });
    res.json(skill);
  } catch (error) {
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

app.get('/api/admin/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
