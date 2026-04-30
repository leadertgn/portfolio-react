import { useState, useEffect } from 'react'
import SkillsList from './SkillsList'
import { ExternalLink, Github, Youtube, Smartphone, Figma, BookOpen, X } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const getIcon = (key) => {
  const k = key.toLowerCase()
  if (k.includes('github')) return <Github size={16} />
  if (k.includes('youtube')) return <Youtube size={16} />
  if (k.includes('play') || k.includes('app') || k.includes('store')) return <Smartphone size={16} />
  if (k.includes('figma')) return <Figma size={16} />
  return <ExternalLink size={16} />
}

export default function ProjectCard({ image, title, description, links, stack, caseStudy }) {
  const { lang } = useLang()
  const t = translations[lang].projects
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Gère les titres/descriptions multilingues
  const displayTitle = typeof title === 'object' ? title[lang] : title
  const displayDescription = typeof description === 'object' ? description[lang] : description
  
  const currentCaseStudy = caseStudy ? (caseStudy[lang] || caseStudy.fr) : null;

  return (
    <>
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 shrink-0">
          <img
            src={image}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4">
            {displayTitle}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">{displayDescription}</p>

          {/* Stack - Mode badge */}
          <div className="mb-4">
            <SkillsList skills={stack} variant="badge" />
          </div>

          {/* Links & Case Study */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            {Object.entries(links)
              .filter(([, url]) => url !== null && url !== '')
              .map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-colors"
                >
                  {getIcon(key)}
                  {key === 'Website' ? t.viewSite : key === 'Github' ? t.viewCode : key}
                </a>
              ))}
              
              {currentCaseStudy && currentCaseStudy.problem && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="ml-auto flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                >
                  <BookOpen size={16} /> {t.caseStudy}
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Case Study Modal (Sortie du .group) */}
      {isModalOpen && currentCaseStudy && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative animate-fade-in cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pr-8">
                {displayTitle} - {t.caseStudy}
              </h2>

              <div className="space-y-8 text-gray-700 dark:text-gray-300">
                {currentCaseStudy.problem && (
                  <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      {t.problem}
                    </h3>
                    <p className="leading-relaxed whitespace-pre-wrap">{currentCaseStudy.problem}</p>
                  </div>
                )}
                
                {currentCaseStudy.solution && (
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                      {t.solution}
                    </h3>
                    <p className="leading-relaxed whitespace-pre-wrap">{currentCaseStudy.solution}</p>
                  </div>
                )}
                
                {currentCaseStudy.results && (
                  <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      {t.results}
                    </h3>
                    <p className="leading-relaxed whitespace-pre-wrap">{currentCaseStudy.results}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
