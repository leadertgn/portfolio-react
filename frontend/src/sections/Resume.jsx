import { Download, FileText, Eye } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function Resume({ resumeRef }) {
  const { lang } = useLang()
  const t = translations[lang].resume

  // Chemin du PDF à placer dans /public/cv/
  const CV_PATH = '/cv/cv-leadertgn.pdf'

  return (
    <section
      ref={resumeRef}
      className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 rounded-full" />
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-xl mx-auto">
          {t.subtitle}
        </p>

        {/* CV Preview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            TOGNON Emeric
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
            {t.role}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {t.cvDescription}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Eye size={18} />
              {t.preview}
            </a>
            <a
              href={CV_PATH}
              download="cv-leadertgn.pdf"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900"
            >
              <Download size={18} />
              {t.download}
            </a>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t.format}
        </p>
      </div>
    </section>
  )
}
