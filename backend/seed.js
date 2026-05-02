import { PrismaClient } from '@prisma/client';
import { projects } from '../frontend/src/data/projects.js';
import { stackData } from '../frontend/src/data/stacks.js';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Début de la migration complète (Seed) ---');

  // 1. Nettoyage complet pour éviter les doublons lors des tests
  console.log('Nettoyage de la base de données...');
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();

  // 2. Migration des Projets
  console.log('Migration des projets...');
  const projectsData = [
    {
      title: { fr: "MemoHub", en: "MemoHub" },
      description: { 
        fr: "Plateforme Full Stack de gestion de mémoires académiques.",
        en: "Full Stack platform for academic memoir management."
      },
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000",
      links: { github: "#", live: "https://memo-hub-murex.vercel.app" },
      stack: ["FastAPI", "PostgreSQL", "React", "Tailwind CSS"],
      caseStudy: {
        fr: {
          problem: "L'absence d'une plateforme centrale rendait la recherche et l'archivage des travaux académiques extrêmement complexes pour les étudiants et l'administration.",
          solution: "Développement d'une API haute performance avec FastAPI et SQLModel. Implémentation d'un système d'authentification robuste (Access/Refresh Token) et d'un moteur de recherche multi-critères.",
          results: "Une plateforme centralisée et fiable capable de gérer efficacement un large volume de documents tout en garantissant la confidentialité des données."
        },
        en: {
          problem: "The lack of a central platform made searching and archiving academic works extremely complex for students and administration.",
          solution: "Development of a high-performance API with FastAPI and SQLModel. Implementation of a robust authentication system (Access/Refresh Token) and a multi-criteria search engine.",
          results: "A centralized and reliable platform capable of efficiently managing a large volume of documents while ensuring data privacy."
        }
      },
      order: 1
    },
    {
      title: { fr: "Cetelec Label Generator", en: "Cetelec Label Generator" },
      description: { 
        fr: "Automatisation industrielle d'étiquettes électriques haute précision. ⚠️ Application optimisée exclusivement pour une utilisation sur PC.",
        en: "Industrial automation of high-precision electrical labels. ⚠️ Application optimized exclusively for PC use."
      },
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
      links: { github: "#", live: "https://cetelec-label-generator.onrender.com" },
      stack: ["Node.js", "Prisma", "React", "CSS Print"],
      caseStudy: {
        fr: {
          problem: "Les techniciens perdaient des heures à concevoir manuellement des étiquettes, avec des erreurs fréquentes de dimensions lors de l'impression sur format A4.",
          solution: "Utilisation des unités millimétriques en CSS et des @media print pour garantir une fidélité d'impression absolue (1:1). Interface de gestion par lots pour uniformiser les styles. ⚠️ Note technique : L'application est exclusivement compatible PC en raison des contraintes d'impression précise et de gestion des formats d'étiquettes.",
          results: "Réduction du temps de conception de 70% et élimination totale des rebuts d'impression dus aux erreurs de format. Interface optimisée pour les écrans PC (souris/clavier)."
        },
        en: {
          problem: "Technicians lost hours manually designing labels, with frequent dimensional errors when printing on A4 format.",
          solution: "Use of millimeter units in CSS and @media print to guarantee absolute print fidelity (1:1). Batch management interface to standardize styles. ⚠️ Technical note: The application is exclusively PC-compatible due to precise printing constraints and label format management.",
          results: "70% reduction in design time and total elimination of print waste due to format errors. Interface optimized for PC screens (mouse/keyboard)."
        }
      },
      order: 2
    },
    {
      title: { fr: "SmartGrow", en: "SmartGrow" },
      description: { 
        fr: "Système d'irrigation intelligent et automatisé utilisant l'IoT.",
        en: "Intelligent and automated irrigation system using IoT."
      },
      image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=1000",
      links: { github: "#", live: "https://smart-irrigation-system-insti.netlify.app" },
      stack: ["Arduino", "ESP32", "Node.js", "React"],
      caseStudy: {
        fr: {
          problem: "Le gaspillage d'eau et le temps consacré à l'arrosage manuel impactaient la rentabilité des exploitations agricoles urbaines.",
          solution: "Déploiement de capteurs d'humidité connectés en temps réel. Algorithme d'automatisation des pompes basé sur les besoins physiologiques réels des plantes.",
          results: "Économie d'eau de 40% et automatisation complète du cycle de vie de l'irrigation, libérant du temps pour d'autres tâches."
        },
        en: {
          problem: "Water waste and time spent on manual watering impacted the profitability of urban farming.",
          solution: "Deployment of real-time connected moisture sensors. Pump automation algorithm based on the actual physiological needs of plants.",
          results: "40% water savings and complete automation of the irrigation lifecycle, freeing up time for other tasks."
        }
      },
      order: 3
    },
    {
      title: { fr: "Application Météo", en: "Weather App" },
      description: { 
        fr: "Interface intuitive de prévisions météo en temps réel.",
        en: "Intuitive real-time weather forecast interface."
      },
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1000",
      links: { github: "#", live: "https://leadertgn.github.io/application-meteo" },
      stack: ["React", "API OpenWeather", "Tailwind CSS"],
      caseStudy: {
        fr: {
          problem: "Les applications météo classiques sont souvent surchargées d'informations inutiles et lentes sur des connexions mobiles instables.",
          solution: "Application ultra-légère focalisée sur l'essentiel, utilisant l'API OpenWeatherMap et un design épuré en glassmorphism pour une lisibilité maximale.",
          results: "Un temps de chargement instantané et une consultation rapide des prévisions quotidiennes."
        },
        en: {
          problem: "Standard weather apps are often overloaded with useless information and slow on unstable mobile connections.",
          solution: "Ultra-lightweight app focused on essentials, using OpenWeatherMap API and a clean glassmorphism design for maximum readability.",
          results: "Instant load time and quick consultation of daily forecasts."
        }
      },
      order: 4
    },
    {
      title: { fr: "Portfolio Personnel", en: "Personal Portfolio" },
      description: { 
        fr: "Application Full Stack dynamique de gestion d'identité professionnelle.",
        en: "Dynamic Full Stack application for professional identity management."
      },
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
      links: { github:"#", live: "https://leadertgn.me" },
      stack: ["React 19", "Node.js", "Prisma", "Tailwind CSS v4"],
      caseStudy: {
        fr: {
          problem: "Les portfolios statiques sont difficiles à maintenir et ne permettent pas de démontrer des compétences backend en temps réel.",
          solution: "Création d'un système Full Stack avec espace admin sécurisé par Google OAuth 2.0. Base de données PostgreSQL pour une gestion dynamique des contenus.",
          results: "Une vitrine vivante et auto-hébergée qui sert elle-même de démonstration technique de mes capacités en développement Web moderne."
        },
        en: {
          problem: "Static portfolios are hard to maintain and don't allow for real-time backend skill demonstration.",
          solution: "Creation of a Full Stack system with admin space secured by Google OAuth 2.0. PostgreSQL database for dynamic content management.",
          results: "A living, self-hosted showcase that itself serves as a technical demonstration of my modern Web development capabilities."
        }
      },
      order: 5
    }
  ];

  for (const project of projectsData) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        image: project.image,
        links: project.links,
        stack: project.stack,
        caseStudy: project.caseStudy,
        order: project.order,
      },
    });
  }
  console.log(`✅ ${projectsData.length} projets migrés.`);

  // 3. Migration des Skills
  console.log('Migration des compétences...');
  let order = 0;
  for (const [categoryName, skills] of Object.entries(stackData)) {
    await prisma.skillCategory.create({
      data: {
        name: { fr: categoryName, en: categoryName },
        order: order++,
        skills: {
          create: skills.map(skill => ({
            name: skill.name
          }))
        }
      }
    });
  }
  console.log('✅ Compétences et catégories migrées avec succès.');
  
  // 4. Migration des Services
  console.log('Migration des services...');
  const services = [
    {
      title: { fr: "Développement Web Full Stack", en: "Full Stack Web Development" },
      description: { 
        fr: "Conception et développement d'applications web modernes, réactives et scalables (React, Node.js, Django). De l'idée à la mise en production.",
        en: "Design and development of modern, responsive and scalable web applications (React, Node.js, Django). From idea to production."
      },
      icon: "Code",
      price: { fr: "Sur devis", en: "On quote" },
      order: 1
    },
    {
      title: { fr: "Systèmes Embarqués & IoT", en: "Embedded Systems & IoT" },
      description: { 
        fr: "Développement de solutions connectées sur mesure : programmation ESP32/Arduino, intégration de capteurs et dashboards de monitoring temps réel.",
        en: "Custom connected solutions development: ESP32/Arduino programming, sensor integration and real-time monitoring dashboards."
      },
      icon: "Smartphone",
      price: { fr: "Sur devis", en: "On quote" },
      order: 2
    },
    {
      title: { fr: "Architecture API & Backend", en: "API & Backend Architecture" },
      description: { 
        fr: "Conception d'APIs RESTful performantes et sécurisées. Optimisation de bases de données et mise en place d'architectures robustes.",
        en: "Design of high-performance and secure RESTful APIs. Database optimization and implementation of robust architectures."
      },
      icon: "Database",
      price: { fr: "Sur devis", en: "On quote" },
      order: 3
    },
    {
      title: { fr: "Audit & Optimisation", en: "Audit & Optimization" },
      description: { 
        fr: "Audit technique complet : performance, sécurité, SEO et accessibilité pour garantir une expérience utilisateur et un référencement optimaux.",
        en: "Complete technical audit: performance, security, SEO and accessibility to ensure optimal user experience and ranking."
      },
      icon: "Monitor",
      price: { fr: "À partir de 300€", en: "Starting from $300" },
      order: 4
    }
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log(`✅ ${services.length} services migrés.`);

  console.log('--- Seed terminé ! ---');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });