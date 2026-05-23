export const projects = [
  {
    "id": 39,
    "title": {
      "en": "MemoHub",
      "fr": "MemoHub"
    },
    "description": {
      "en": "Full Stack platform for academic memoir management.",
      "fr": "Plateforme Full Stack de gestion de mémoires académiques."
    },
    "stack": [
      {
        "name": "FastAPI"
      },
      {
        "name": "PostgreSQL"
      },
      {
        "name": "React"
      },
      {
        "name": "Tailwind CSS"
      }
    ],
    "image": "https://res.cloudinary.com/dv9emizzs/image/upload/v1778198556/tognon_portfolio_v2/ffizbawmwhwnsbugekpa.png",
    "links": {
      "live": "https://memo-hub-murex.vercel.app"
    },
    "caseStudy": {
      "en": {
        "problem": "The lack of a central platform made searching and archiving academic works extremely complex for students and administration.",
        "results": "A centralized and reliable platform capable of efficiently managing a large volume of documents while ensuring data privacy.",
        "solution": "Development of a high-performance API with FastAPI and SQLModel. Implementation of a robust authentication system (Access/Refresh Token) and a multi-criteria search engine."
      },
      "fr": {
        "problem": "L'absence d'une plateforme centrale rendait la recherche et l'archivage des travaux académiques extrêmement complexes pour les étudiants et l'administration.",
        "results": "Une plateforme centralisée et fiable capable de gérer efficacement un large volume de documents tout en garantissant la confidentialité des données.",
        "solution": "Développement d'une API haute performance avec FastAPI et SQLModel. Implémentation d'un système d'authentification robuste (Access/Refresh Token) et d'un moteur de recherche multi-critères."
      }
    },
    "order": 1
  },
  {
    "id": 40,
    "title": {
      "en": "Cetelec Label Generator",
      "fr": "Cetelec Label Generator"
    },
    "description": {
      "en": "Industrial automation of high-precision electrical labels. ⚠️ Application optimized exclusively for PC use.",
      "fr": "Automatisation industrielle d'étiquettes électriques haute précision. ⚠️ Application optimisée exclusivement pour une utilisation sur PC."
    },
    "stack": [
      {
        "name": "Node.js"
      },
      {
        "name": "Prisma"
      },
      {
        "name": "React"
      },
      {
        "name": "CSS Print"
      }
    ],
    "image": "https://res.cloudinary.com/dv9emizzs/image/upload/v1777742105/tognon_portfolio_v2/mxafrcycl9tvr0qrj2ke.png",
    "links": {
      "live": "https://cetelec-label-generator.onrender.com"
    },
    "caseStudy": {
      "en": {
        "problem": "Technicians lost hours manually designing labels, with frequent dimensional errors when printing on A4 format.",
        "results": "70% reduction in design time and total elimination of print waste due to format errors. Interface optimized for PC screens (mouse/keyboard).",
        "solution": "Use of millimeter units in CSS and @media print to guarantee absolute print fidelity (1:1). Batch management interface to standardize styles. ⚠️ Technical note: The application is exclusively PC-compatible due to precise printing constraints and label format management."
      },
      "fr": {
        "problem": "Les techniciens perdaient des heures à concevoir manuellement des étiquettes, avec des erreurs fréquentes de dimensions lors de l'impression sur format A4.",
        "results": "Réduction du temps de conception de 70% et élimination totale des rebuts d'impression dus aux erreurs de format. Interface optimisée pour les écrans PC (souris/clavier).",
        "solution": "Utilisation des unités millimétriques en CSS et des @media print pour garantir une fidélité d'impression absolue (1:1). Interface de gestion par lots pour uniformiser les styles. ⚠️ Note technique : L'application est exclusivement compatible PC en raison des contraintes d'impression précise et de gestion des formats d'étiquettes."
      }
    },
    "order": 2
  },
  {
    "id": 41,
    "title": {
      "en": "SmartGrow",
      "fr": "SmartGrow"
    },
    "description": {
      "en": "Intelligent and automated irrigation system using IoT.",
      "fr": "Système d'irrigation intelligent et automatisé utilisant l'IoT."
    },
    "stack": [
      {
        "name": "Arduino"
      },
      {
        "name": "ESP32"
      },
      {
        "name": "Node.js"
      },
      {
        "name": "React"
      }
    ],
    "image": "https://res.cloudinary.com/dv9emizzs/image/upload/v1777742184/tognon_portfolio_v2/bhjkykyqhtuehlnvofcj.png",
    "links": {
      "live": "https://smart-irrigation-system-insti.netlify.app"
    },
    "caseStudy": {
      "en": {
        "problem": "Water waste and time spent on manual watering impacted the profitability of urban farming.",
        "results": "40% water savings and complete automation of the irrigation lifecycle, freeing up time for other tasks.",
        "solution": "Deployment of real-time connected moisture sensors. Pump automation algorithm based on the actual physiological needs of plants."
      },
      "fr": {
        "problem": "Le gaspillage d'eau et le temps consacré à l'arrosage manuel impactaient la rentabilité des exploitations agricoles urbaines.",
        "results": "Économie d'eau de 40% et automatisation complète du cycle de vie de l'irrigation, libérant du temps pour d'autres tâches.",
        "solution": "Déploiement de capteurs d'humidité connectés en temps réel. Algorithme d'automatisation des pompes basé sur les besoins physiologiques réels des plantes."
      }
    },
    "order": 3
  },
  {
    "id": 42,
    "title": {
      "en": "Weather App",
      "fr": "Application Météo"
    },
    "description": {
      "en": "Intuitive real-time weather forecast interface.",
      "fr": "Interface intuitive de prévisions météo en temps réel."
    },
    "stack": [
      {
        "name": "React"
      },
      {
        "name": "API OpenWeather"
      },
      {
        "name": "Tailwind CSS"
      }
    ],
    "image": "https://res.cloudinary.com/dv9emizzs/image/upload/v1777742129/tognon_portfolio_v2/fj6da7ss8hko5d7k4hnl.png",
    "links": {
      "live": "https://leadertgn.github.io/application-meteo"
    },
    "caseStudy": {
      "en": {
        "problem": "Standard weather apps are often overloaded with useless information and slow on unstable mobile connections.",
        "results": "Instant load time and quick consultation of daily forecasts.",
        "solution": "Ultra-lightweight app focused on essentials, using OpenWeatherMap API and a clean glassmorphism design for maximum readability."
      },
      "fr": {
        "problem": "Les applications météo classiques sont souvent surchargées d'informations inutiles et lentes sur des connexions mobiles instables.",
        "results": "Un temps de chargement instantané et une consultation rapide des prévisions quotidiennes.",
        "solution": "Application ultra-légère focalisée sur l'essentiel, utilisant l'API OpenWeatherMap et un design épuré en glassmorphism pour une lisibilité maximale."
      }
    },
    "order": 4
  },
  {
    "id": 43,
    "title": {
      "en": "Personal Portfolio",
      "fr": "Portfolio Personnel"
    },
    "description": {
      "en": "Dynamic Full Stack application for professional identity management.",
      "fr": "Application Full Stack dynamique de gestion d'identité professionnelle."
    },
    "stack": [
      {
        "name": "React 19"
      },
      {
        "name": "Node.js"
      },
      {
        "name": "Prisma"
      },
      {
        "name": "Tailwind CSS v4"
      }
    ],
    "image": "https://res.cloudinary.com/dv9emizzs/image/upload/v1777742165/tognon_portfolio_v2/uv9hy2mkptmsx09writm.png",
    "links": {
      "live": "https://leadertgn.me"
    },
    "caseStudy": {
      "en": {
        "problem": "Static portfolios are hard to maintain and don't allow for real-time backend skill demonstration.",
        "results": "A living, self-hosted showcase that itself serves as a technical demonstration of my modern Web development capabilities.",
        "solution": "Creation of a Full Stack system with admin space secured by Google OAuth 2.0. PostgreSQL database for dynamic content management."
      },
      "fr": {
        "problem": "Les portfolios statiques sont difficiles à maintenir et ne permettent pas de démontrer des compétences backend en temps réel.",
        "results": "Une vitrine vivante et auto-hébergée qui sert elle-même de démonstration technique de mes capacités en développement Web moderne.",
        "solution": "Création d'un système Full Stack avec espace admin sécurisé par Google OAuth 2.0. Base de données PostgreSQL pour une gestion dynamique des contenus."
      }
    },
    "order": 5
  }
];
