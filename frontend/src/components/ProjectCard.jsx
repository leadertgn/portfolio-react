import SkillsList from './SkillsList'
import { ExternalLink, Github } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function ProjectCard({ image, title, description, links, stack }) {
  const { lang } = useLang()
  const t = translations[lang].projects

  // Gère les titres/descriptions multilingues
  const displayTitle = typeof title === 'object' ? title[lang] : title
  const displayDescription = typeof description === 'object' ? description[lang] : description

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {displayTitle}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{displayDescription}</p>

        {/* Stack - Mode badge */}
        <SkillsList skills={stack} variant="badge" />

        {/* Links */}
        <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          {Object.entries(links)
            .filter(([, url]) => url !== null)
            .map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-colors"
              >
                {key === 'Github' ? <Github size={16} /> : <ExternalLink size={16} />}
                {key === 'Website' ? t.viewSite : key === 'Github' ? t.viewCode : key}
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}
