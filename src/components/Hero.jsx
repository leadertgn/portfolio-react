import SocialLinksCard from "./SocialLinksCard"
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function Hero() {
  const { lang } = useLang()
  const t = translations[lang].hero

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 animate-slideDown">
          Eméric R. S. TOGNON
        </h1>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-6 animate-slideDown" style={{animationDelay: '0.1s'}}>
          {t.title}
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slideDown leading-relaxed" style={{animationDelay: '0.2s'}}>
          {t.subtitle}
        </p>
        
        <div className="animate-slideDown" style={{animationDelay: '0.3s'}}>
          <SocialLinksCard />
        </div>
      </div>
    </section>
  )
}