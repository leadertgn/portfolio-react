import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SkillsList from './SkillsList'
import { Github, BookOpen, X, ExternalLink, Play } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function ProjectCard({ image, title, description, links, stack, caseStudy }) {
  const { lang } = useLang()
  const t = translations[lang].projects
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Fermeture avec Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    if (isModalOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isModalOpen])

  const displayTitle = typeof title === 'object' ? title[lang] : title
  const displayDescription = typeof description === 'object' ? description[lang] : description
  const currentCaseStudy = caseStudy ? caseStudy[lang] || caseStudy.fr : null

  // Extraire l'URL du live / site web
  const liveUrl =
    links?.live && links.live !== '#' && links.live !== ''
      ? links.live
      : links?.website && links.website !== '#' && links.website !== ''
        ? links.website
        : links?.Website && links.Website !== '#' && links.Website !== ''
          ? links.Website
          : links?.url && links.url !== '#' && links.url !== ''
            ? links.url
            : null

  const githubUrl =
    links?.github && links.github !== '#' && links.github !== ''
      ? links.github
      : links?.GitHub && links.GitHub !== '#' && links.GitHub !== ''
        ? links.GitHub
        : links?.Github && links.Github !== '#' && links.Github !== ''
          ? links.Github
          : null

  const hasCaseStudy = currentCaseStudy && currentCaseStudy.problem

  return (
    <>
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
        {/* Image cliquable → Live URL */}
        <div className="relative overflow-hidden h-48 shrink-0">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.viewSite} : ${displayTitle}`}
              className="block w-full h-full relative"
            >
              <img
                src={image}
                alt={displayTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Badge "Live" permanent (Surtout pour Mobile) */}
              <div className="absolute top-3 right-3 z-10">
                <span className="flex items-center gap-1.5 bg-blue-600/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md backdrop-blur-sm border border-blue-400/30 shadow-lg">
                  <Play size={10} className="fill-white" />
                  Live
                </span>
              </div>

              {/* Overlay Desktop au survol */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="flex items-center gap-2 text-white text-sm font-semibold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ExternalLink size={14} />
                  {t.clickToView}
                </span>
              </div>
            </a>
          ) : (
            <>
              <img
                src={image}
                alt={displayTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col grow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
            {displayTitle}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 grow text-sm line-clamp-3">
            {displayDescription}
          </p>

          {/* Stack badges */}
          <div className="mb-4">
            <SkillsList skills={stack} variant="badge" />
          </div>

          {/* Footer simplifié : GitHub + Étude de cas */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium transition-colors"
                title={t.viewCode}
              >
                <Github size={16} />
                Code
              </a>
            )}

            {hasCaseStudy && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-auto flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-bold transition-colors"
              >
                <BookOpen size={14} />
                {t.caseStudy.split(' ').slice(-3).join(' ')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal via React Portal */}
      {isModalOpen &&
        currentCaseStudy &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative cursor-default overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header modal */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{displayTitle}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body modal */}
              <div className="overflow-y-auto p-6 space-y-6">
                {[
                  { title: t.problem, content: currentCaseStudy.problem, color: 'red' },
                  { title: t.solution, content: currentCaseStudy.solution, color: 'blue' },
                  { title: t.results, content: currentCaseStudy.results, color: 'green' },
                ].map(
                  (section) =>
                    section.content && (
                      <div key={section.title} className="space-y-2">
                        <h3
                          className={`text-xs font-black uppercase tracking-widest text-${section.color}-600 dark:text-${section.color}-400`}
                        >
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    )
                )}

                {liveUrl && (
                  <div className="pt-4">
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      <ExternalLink size={18} />
                      {t.viewSite}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
