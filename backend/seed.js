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

  // 2. Migration des Projets
  console.log('Migration des projets...');
  for (const project of projects) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        image: project.image, // Utilise les chemins actuels (/images/...)
        links: project.links,
        stack: project.stack.map(s => s.name),
        order: project.id,
      },
    });
  }
  console.log(`✅ ${projects.length} projets migrés.`);

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
