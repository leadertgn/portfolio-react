# Portfolio — Eméric R. S. Tognon

Application **Full Stack dynamique** servant de portfolio professionnel, avec un espace
d'administration sécurisé permettant de gérer projets, compétences, services et témoignages
**sans toucher au code**.

🔗 **Démo en ligne : [leadertgn.me](https://leadertgn.me)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css&logoColor=white)

---

## ✨ Fonctionnalités

- 🌍 **Bilingue** (FR / EN) avec bascule instantanée
- 🎨 **Thème clair / sombre**
- 🔐 **Espace admin** protégé par **Google OAuth 2.0** (seul l'email admin peut modifier)
- 📝 **CRUD complet** : projets, compétences, services, témoignages
- 🖼️ **Upload d'images** via Cloudinary
- ⚡ **Contenu 100 % dynamique** servi par une API REST

---

## 🏗️ Architecture

Monorepo avec deux applications indépendantes :

```
portfolio-react/
├── backend/     # API REST — Node.js + Express + Prisma + PostgreSQL + Cloudinary
└── frontend/    # SPA — React 19 + Vite + Tailwind CSS v4
```

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 19 · Vite · Tailwind CSS v4 · React Router · Axios · Lucide |
| **Backend** | Node.js · Express · Prisma ORM · Google Auth Library · Multer |
| **Base de données** | PostgreSQL |
| **Médias** | Cloudinary |
| **Auth** | Google OAuth 2.0 |

---

## 🚀 Installation locale

### Prérequis
- Node.js ≥ 20 et npm ≥ 10
- Une base PostgreSQL
- Un compte [Cloudinary](https://cloudinary.com) et un [Client ID Google OAuth](https://console.cloud.google.com/)

### 1. Cloner le dépôt
```bash
git clone https://github.com/leadertgn/portfolio-react.git
cd portfolio-react
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env      # puis renseigne les variables (voir ci-dessous)
npm run prisma:generate
npm run dev                # démarre sur http://localhost:5000
```

### 3. Frontend
```bash
cd ../frontend
npm install
cp .env.example .env      # puis renseigne les variables
npm run dev                # démarre sur http://localhost:5173
```

---

## 🔑 Variables d'environnement

**`backend/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"
GOOGLE_CLIENT_ID="ton-client-id.apps.googleusercontent.com"
ADMIN_EMAIL="ton-email@gmail.com"           # seul cet email peut administrer
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
FRONTEND_URL="http://localhost:5173"
BACKEND_URL="http://localhost:5000"
PORT=5000
```

**`frontend/.env`**
```env
VITE_GOOGLE_CLIENT_ID="ton-client-id.apps.googleusercontent.com"
VITE_BACKEND_URL="http://localhost:5000"
VITE_ADMIN_EMAIL="ton-email@gmail.com"
```

---

## 📦 Scripts utiles

| Commande | Emplacement | Rôle |
|----------|-------------|------|
| `npm run dev` | frontend / backend | Lancement en développement |
| `npm run build` | frontend | Build de production |
| `npm run prisma:studio` | backend | Explorer la base de données |
| `npm run export-seed` | backend | Exporter les données de seed |

---

## 👤 Auteur

**Eméric R. S. Tognon** — Développeur Full Stack & Systèmes Embarqués
🌐 [leadertgn.me](https://leadertgn.me) · 💼 [LinkedIn](https://www.linkedin.com/in/tognon-emeric)
