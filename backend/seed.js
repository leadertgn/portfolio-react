import { PrismaClient } from '@prisma/client';
import { stackData } from '../frontend/src/data/stacks.js';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Début de la migration complète (Seed) ---');

  // 1. Nettoyage complet
  console.log('Nettoyage de la base de données...');
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();

  // 2. Migration des Projets
  console.log('Migration des projets...');
  const projectsData = [
    // 🔥 PROJET 1 : CircuitVision AI
    {
      title: { fr: "CircuitVision AI", en: "CircuitVision AI" },
      description: {
        fr: "Outil IA qui analyse des projets hardware GitHub et génère documentation complète, détection de bugs et liste de composants en 25 secondes.",
        en: "AI tool that analyzes GitHub hardware projects and generates complete documentation, bug detection, and component lists in 25 seconds."
      },
      image: "/images/projects/circuitvision.png",
      links: {
        github: "https://github.com/leadertgn/circuitvision-ai",
        live: "https://circuit-vision-ai.vercel.app/"
      },
      stack: ["Next.js", "Gemini 3 API", "Firebase", "GitHub API"],
      caseStudy: {
        fr: {
          problem: "Après avoir passé 2 semaines à debugger un ESP8266 pour SmartGrow et 5 heures à documenter manuellement le projet, j'ai réalisé que les makers africains perdent un temps précieux à cause de l'absence d'outils automatisés pour la documentation et le debugging hardware.",
          solution: "J'ai développé CircuitVision AI en 12 jours pour le hackathon Gemini 3 sur Devpost. L'outil analyse un dépôt GitHub, génère une documentation complète en 8 sections, détecte les bugs (voltage, pins, timing, sécurité), et liste les composants avec prix en temps réel via Google Search intégré.",
          results: "Le prototype est déployé et a reçu des retours encourageants de la communauté (17 réactions, 8 commentaires, 552 impressions sur LinkedIn)."
        },
        en: {
          problem: "After spending 2 weeks debugging an ESP8266 for SmartGrow and 5 hours manually documenting the project, I realized that African makers waste precious time due to the lack of automated tools for hardware documentation and debugging.",
          solution: "I built CircuitVision AI in 12 days for the Gemini 3 hackathon on Devpost. The tool analyzes a GitHub repo, generates complete documentation in 8 sections, detects bugs (voltage, pins, timing, security), and lists components with real-time prices via integrated Google Search.",
          results: "The prototype is deployed and received encouraging community feedback (17 reactions, 8 comments, 552 impressions on LinkedIn)."
        }
      },
      order: 0
    },
    // PROJET 2 : MemoHub
    {
      title: { fr: "MemoHub", en: "MemoHub" },
      description: {
        fr: "Plateforme Full Stack de gestion de mémoires académiques.",
        en: "Full Stack platform for academic memoir management."
      },
      image: "/images/projects/memohub.png",
      links: {
        github: "#",
        live: "https://memo-hub-murex.vercel.app"
      },
      stack: ["FastAPI", "PostgreSQL", "React", "Tailwind CSS"],
      caseStudy: {
        fr: {
          problem: "L'absence d'une plateforme centrale rendait la recherche et l'archivage des travaux académiques extrêmement complexes pour les étudiants et l'administration.",
          solution: "Développement d'une API haute performance avec FastAPI et SQLModel. Implémentation d'un système d'authentification robuste (Access/Refresh Token), d'un moteur de recherche multi-critères et d'un système de modération à trois niveaux.",
          results: "Une plateforme centralisée et fiable qui répertorie plus de 55 universités."
        },
        en: {
          problem: "The lack of a central platform made searching and archiving academic works extremely complex for students and administration.",
          solution: "Development of a high-performance API with FastAPI and SQLModel. Implementation of a robust authentication system, a multi-criteria search engine, and a three-level moderation system.",
          results: "A centralized and reliable platform that lists over 55 universities."
        }
      },
      order: 1
    },
    // PROJET 3 : Cetelec Label Generator
    {
      title: { fr: "Cetelec Label Generator", en: "Cetelec Label Generator" },
      description: {
        fr: "Automatisation industrielle d'étiquettes électriques haute précision. ⚠️ Application optimisée exclusivement pour une utilisation sur PC.",
        en: "Industrial automation of high-precision electrical labels. ⚠️ Application optimized exclusively for PC use."
      },
      image: "/images/projects/cetelec.png",
      links: {
        github: "#",
        live: "https://cetelec-label-generator.onrender.com"
      },
      stack: ["Node.js", "Prisma", "React", "CSS Print"],
      caseStudy: {
        fr: {
          problem: "Les techniciens perdaient un temps considérable à créer des étiquettes manuellement dans Word. Pour un projet de 12 à 13 tableaux, cela pouvait prendre 2 à 3 jours.",
          solution: "Conception d'un logiciel sur mesure avec React, Express et PostgreSQL. Utilisation des unités millimétriques en CSS pour garantir une fidélité d'impression absolue.",
          results: "Un projet qui prenait 2 à 3 jours est désormais réalisé en 6 heures. Élimination totale des rebuts d'impression."
        },
        en: {
          problem: "Technicians spent significant time creating labels manually in Word. For a project with 12 to 13 electrical panels, this could take 2 to 3 days.",
          solution: "Design of custom software with React, Express and PostgreSQL. Use of millimeter units in CSS to guarantee absolute print fidelity.",
          results: "A project that took 2 to 3 days is now completed in 6 hours. Total elimination of print waste."
        }
      },
      order: 2
    },
    // PROJET 4 : SmartGrow
    {
      title: { fr: "SmartGrow", en: "SmartGrow" },
      description: {
        fr: "Système d'irrigation intelligent et automatisé utilisant l'IoT.",
        en: "Intelligent and automated irrigation system using IoT."
      },
      image: "/images/projects/smartgrow.png",
      links: {
        github: "#",
        live: "https://smart-irrigation-system-insti.netlify.app"
      },
      stack: ["Arduino", "ESP32", "Node.js", "React"],
      caseStudy: {
        fr: {
          problem: "Le gaspillage d'eau et le temps consacré à l'arrosage manuel impactaient la rentabilité des exploitations agricoles urbaines.",
          solution: "Déploiement de capteurs d'humidité connectés en temps réel. Algorithme d'automatisation des pompes basé sur les besoins physiologiques réels des plantes.",
          results: "Économie d'eau de 40% et automatisation complète du cycle de vie de l'irrigation. Projet noté 10/10, réalisé en équipe de 4."
        },
        en: {
          problem: "Water waste and time spent on manual watering impacted the profitability of urban farming.",
          solution: "Deployment of real-time connected moisture sensors. Pump automation algorithm based on the actual physiological needs of plants.",
          results: "40% water savings and complete automation of the irrigation lifecycle. Class project scored 10/10, completed with a team of 4."
        }
      },
      order: 3
    },
    // PROJET 5 : Portfolio Personnel
    {
      title: { fr: "Portfolio Personnel", en: "Personal Portfolio" },
      description: {
        fr: "Application Full Stack dynamique de gestion d'identité professionnelle.",
        en: "Dynamic Full Stack application for professional identity management."
      },
      image: "/images/projects/portfolio.png",
      links: {
        github: "#",
        live: "https://leadertgn.me"
      },
      stack: ["React 19", "Node.js", "Prisma", "Tailwind CSS v4"],
      caseStudy: {
        fr: {
          problem: "Les portfolios statiques sont difficiles à maintenir et ne permettent pas de démontrer des compétences backend en temps réel.",
          solution: "Création d'un système Full Stack avec espace admin sécurisé par Google OAuth 2.0. Base de données PostgreSQL pour une gestion dynamique des contenus.",
          results: "Une vitrine vivante et auto-hébergée qui sert elle-même de démonstration technique."
        },
        en: {
          problem: "Static portfolios are hard to maintain and don't allow for real-time backend skill demonstration.",
          solution: "Creation of a Full Stack system with admin space secured by Google OAuth 2.0. PostgreSQL database for dynamic content management.",
          results: "A living, self-hosted showcase that itself serves as a technical demonstration."
        }
      },
      order: 4
    },
    // PROJET 6 : Application Météo
    {
      title: { fr: "Application Météo", en: "Weather App" },
      description: {
        fr: "Interface intuitive de prévisions météo en temps réel.",
        en: "Intuitive real-time weather forecast interface."
      },
      image: "/images/projects/weather.png",
      links: {
        github: "#",
        live: "https://leadertgn.github.io/application-meteo"
      },
      stack: ["React", "API OpenWeather", "Tailwind CSS"],
      caseStudy: {
        fr: {
          problem: "Les applications météo classiques sont souvent surchargées d'informations inutiles et lentes sur des connexions mobiles instables.",
          solution: "Application ultra-légère focalisée sur l'essentiel, utilisant l'API OpenWeatherMap et un design épuré.",
          results: "Un temps de chargement instantané et une consultation rapide des prévisions quotidiennes."
        },
        en: {
          problem: "Standard weather apps are often overloaded with useless information and slow on unstable mobile connections.",
          solution: "Ultra-lightweight app focused on essentials, using OpenWeatherMap API and a clean design.",
          results: "Instant load time and quick consultation of daily forecasts."
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