import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(backendDir, "..");
const frontendDataDir = path.resolve(repoRoot, "frontend", "src", "data");
const exportDir = path.resolve(backendDir, "exports");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function backupIfExists(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  const stat = fs.statSync(targetPath);
  if (!stat.isFile()) return;

  const backupDir = path.join(path.dirname(targetPath), ".backups");
  ensureDir(backupDir);

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(
    backupDir,
    `${path.basename(targetPath)}.${ts}.bak`,
  );
  fs.copyFileSync(targetPath, backupPath);
  console.log(`Backup créé: ${path.relative(repoRoot, backupPath)}`);
}

function writeJsModule(filePath, exportName, data) {
  const content = `export const ${exportName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Écrit: ${path.relative(repoRoot, filePath)}`);
}

function normalizeLinks(links) {
  const normalized = {};
  if (!links || typeof links !== "object" || Array.isArray(links)) {
    return normalized;
  }

  for (const [key, value] of Object.entries(links)) {
    if (value == null || value === "") continue;

    const lower = key.toLowerCase();
    if (["live", "website", "url", "site"].includes(lower)) {
      normalized.live = value;
      continue;
    }

    if (["github", "gitlab"].includes(lower)) {
      normalized.github = value;
      continue;
    }

    normalized[key] = value;
  }

  return normalized;
}

function normalizeStack(stack) {
  if (!Array.isArray(stack)) return [];

  return stack
    .map((item) => {
      if (typeof item === "string") return { name: item };
      if (item && typeof item === "object" && typeof item.name === "string") {
        return { name: item.name };
      }
      return null;
    })
    .filter(Boolean);
}

function exportKeyFromCategory(category) {
  if (!category?.name || typeof category.name !== "object") {
    return `Category-${category?.id ?? "unknown"}`;
  }

  return category.name.fr || category.name.en || `Category-${category.id}`;
}

async function main() {
  try {
    console.log("Connexion à la base...");

    const args = process.argv.slice(2);
    const dryRun = args.includes("--dry-run");
    if (dryRun) {
      console.log(
        "Mode dry-run activé — aucun fichier ne sera écrit, seulement un aperçu sera affiché.",
      );
    }

    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL manquant. Vérifiez votre fichier .env backend.",
      );
    }

    if (!dryRun) {
      ensureDir(frontendDataDir);
      ensureDir(exportDir);
    }

    const [projects, skillCategories, testimonials, services] =
      await Promise.all([
        prisma.project.findMany({ orderBy: { order: "asc" } }),
        prisma.skillCategory.findMany({
          include: { skills: true },
          orderBy: { order: "asc" },
        }),
        prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
        prisma.service.findMany({ orderBy: { order: "asc" } }),
      ]);

    // Safety check: if database returned no data at all, abort to avoid overwriting
    // frontend seed files with empty arrays and losing local backup content.
    if (
      (!projects || projects.length === 0) &&
      (!skillCategories || skillCategories.length === 0) &&
      (!testimonials || testimonials.length === 0) &&
      (!services || services.length === 0)
    ) {
      console.warn(
        "Aucune donnée trouvée en base — export annulé pour éviter d'écraser les fichiers locaux.",
      );
      await prisma.$disconnect();
      return;
    }

    const projectsForFrontend = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      stack: normalizeStack(project.stack),
      image: project.image || "",
      links: normalizeLinks(project.links),
      caseStudy: project.caseStudy ?? null,
      order: project.order ?? 0,
    }));

    const stackData = Object.fromEntries(
      skillCategories.map((category) => [
        exportKeyFromCategory(category),
        category.skills.map((skill) => ({
          id: skill.id,
          name: skill.name,
        })),
      ]),
    );

    const servicesForFrontend = services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price ?? null,
      order: service.order ?? 0,
    }));

    const testimonialsForFrontend = testimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role ?? null,
      content: testimonial.content,
      image: testimonial.image || "",
      order: testimonial.order ?? 0,
    }));

    const filesToBackup = [
      path.join(frontendDataDir, "projects.js"),
      path.join(frontendDataDir, "stacks.js"),
      path.join(frontendDataDir, "services.js"),
      path.join(frontendDataDir, "testimonials.js"),
    ];
    if (!dryRun) {
      filesToBackup.forEach(backupIfExists);

      writeJsModule(
        path.join(frontendDataDir, "projects.js"),
        "projects",
        projectsForFrontend,
      );
      writeJsModule(
        path.join(frontendDataDir, "stacks.js"),
        "stackData",
        stackData,
      );
      writeJsModule(
        path.join(frontendDataDir, "services.js"),
        "services",
        servicesForFrontend,
      );
      writeJsModule(
        path.join(frontendDataDir, "testimonials.js"),
        "testimonials",
        testimonialsForFrontend,
      );
    } else {
      console.log("Dry-run aperçu : fichiers qui seraient écrits :");
      console.log(
        " - projects:",
        path.join(frontendDataDir, "projects.js"),
        "(items=",
        projectsForFrontend.length,
        ")",
      );
      console.log(
        " - stacks:",
        path.join(frontendDataDir, "stacks.js"),
        "(keys=",
        Object.keys(stackData).length,
        ")",
      );
      console.log(
        " - services:",
        path.join(frontendDataDir, "services.js"),
        "(items=",
        servicesForFrontend.length,
        ")",
      );
      console.log(
        " - testimonials:",
        path.join(frontendDataDir, "testimonials.js"),
        "(items=",
        testimonialsForFrontend.length,
        ")",
      );
    }

    const exportPath = path.join(
      exportDir,
      `db-export-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
    );

    if (!dryRun) {
      fs.writeFileSync(
        exportPath,
        JSON.stringify(
          {
            projects,
            skillCategories,
            testimonials,
            services,
            frontendExport: {
              projects: projectsForFrontend,
              stackData,
              services: servicesForFrontend,
              testimonials: testimonialsForFrontend,
            },
          },
          null,
          2,
        ),
        "utf8",
      );

      console.log(`Export JSON créé: ${path.relative(repoRoot, exportPath)}`);
    } else {
      console.log(
        "Dry-run : aucun fichier JSON n'a été écrit. Chemin proposé:",
        exportPath,
      );
    }
    console.log("✅ Export terminé. Les fichiers frontend ont été mis à jour.");
  } catch (error) {
    console.error("Erreur lors de l export:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
