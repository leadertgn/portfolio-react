import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function About() {
  const { lang } = useLang()
  const t = translations[lang].about

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12 rounded-full" />
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src="/images/me.jpg"
              alt="Eméric R. S. TOGNON"
              className="w-56 h-56 rounded-full object-cover shadow-2xl ring-4 ring-blue-500/20 dark:ring-blue-400/20 hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Description */}
          <div className="space-y-5 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              {t.p1}
            </p>
            
            <p className="leading-relaxed">
              {t.p2}
            </p>
            
            {/* Nouveau : Rôle Lead Tech Communities */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400 p-4 rounded-r-lg">
              <p className="leading-relaxed font-medium text-blue-900 dark:text-blue-300">
                {t.leadership}
              </p>
            </div>
            
            <p className="leading-relaxed">
              {t.p3}
            </p>
            
            <div className="pt-4">
              <p className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2 text-lg">
                {t.available}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}