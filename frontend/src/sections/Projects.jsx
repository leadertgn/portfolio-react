import { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import { ProjectSkeleton } from '../components/Skeletons'
import { projectService } from '../services/api'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { projects as localProjects } from '../data/projects'

export default function Projects() {
  const { lang } = useLang()
  const t = translations[lang].projects
  const [projectsList, setProjectsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll()
        setProjectsList(data)
      } catch (error) {
        console.error('Erreur lors du chargement des projets, chargement des données locales:', error)
        // Formatage pour correspondre au format attendu (la data locale a déjà un format array d'objets pour stack)
        setProjectsList(localProjects.map(p => ({
          ...p,
          stack: p.stack.map(s => s.name)
        })))
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-fadeIn">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Affichage des Skeletons pendant le chargement
            Array.from({ length: 3 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          ) : (
            projectsList.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                description={project.description}
                links={project.links}
                stack={project.stack.map(s => ({ name: s }))} // Formatage pour LinkCard
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
