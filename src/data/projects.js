export const projects = [
  {
    id: 1,
    title: {
      fr: "Portfolio Personnel",
      en: "Personal Portfolio"
    },
    description: {
      fr: "Site vitrine moderne et responsive présentant mes compétences et projets",
      en: "Modern and responsive showcase website presenting my skills and projects"
    },
    stack: [
      { name: "React" },
      { name: "TailwindCSS" }
    ],
    image: "/images/portfolio.png",
    links: {
      "Website": "https://leadertgn.netlify.app/",
    }
  },
  {
    id: 2,
    title: {
      fr: "Agrisense - Système d'Irrigation Intelligent",
      en: "Agrisense - Intelligent Irrigation System"
    },
    description: {
      fr: "Projet IoT avec dashboard Firebase pour l'irrigation à distance. Contrôle d'électrovanne et monitoring en temps réel. Connectez-vous pour explorer l'interface, ou contactez-moi pour obtenir des identifiants de démonstration.",
      en: "IoT project with a Firebase dashboard for remote irrigation. Solenoid valve control and real-time monitoring. Log in to explore the interface, or contact me for demo credentials."
    },
    stack: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" },
      { name: "Firebase-Auth-Realtime-Hosting" },
      { name: "ESP8266" }
    ],
    image: "/images/agrisense.png",
    links: {
      "Website": "https://essai-iot-52c18.web.app/"
    }
  },
  {
    id: 3,
    title: {
      fr: "Application Météo",
      en: "Weather app"
    },
    description: {
      fr: "Application web météo interactive qui affiche les conditions en temps réel (température, humidité, vent, pression…) via l’API OpenWeatherMap.",
      en: "Interactive web weather application that displays real-time conditions (temperature, humidity, wind, pressure…) via the OpenWeatherMap API."
    },
    stack: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" }
    ],
    image: "https://leadertgn.github.io/mon-portfolio/assets/images/application_meteo.webp",
    links: {
      "website": "https://leadertgn.github.io/application-meteo/"
    }
  },
  {
    id: 4,
    title: {
      fr: "Smart Grow - Supervision Industrielle & IoT",
      en: "Smart Grow - Industrial Monitoring & IoT"
    },
    description: {
      fr: "Système d'irrigation autonome haute fiabilité avec architecture Fail-safe. Intègre un moteur de décision hybride (Capteurs + API Météo) et un dashboard analytique temps réel. L'accès est sécurisé : contactez-moi pour obtenir des identifiants de démonstration.",
      en: "High-reliability autonomous irrigation system with Fail-safe architecture. Features a hybrid decision engine (Sensors + Weather API) and a real-time analytical dashboard. Access is secured: contact me for demo credentials."
    },
    stack: [
      { name: "React (Vite)" },
      { name: "Node.js (Express)" },
      { name: "Firebase (RTDB & Auth)" },
      { name: "C++ (ESP32/ESP8266)" },
      { name: "TailwindCSS" },
      { name: "Recharts" }
    ],
    image: "/images/smart_grow.png", 
    links: {
      "Website": "https://smart-irrigation-system-insti.netlify.app/",
    }
  },
]