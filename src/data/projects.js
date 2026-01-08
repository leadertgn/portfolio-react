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
      "Website": "https://mon-portfolio.vercel.app",
      "Github": "https://github.com/leadertgn/portfolio"
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
    image: "https://leadertgn.github.io/mon-portfolio/assets/images/agrisense_connexion.webp",
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
  }
]