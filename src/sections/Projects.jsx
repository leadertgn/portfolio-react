import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function Projects() {
  const { lang } = useLang()
  const t = translations[lang].projects

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-fadeIn">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              links={project.links}
              stack={project.stack}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
