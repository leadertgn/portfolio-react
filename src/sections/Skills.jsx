import SkillsCategoryCard from '../components/SkillsCategoryCard'
import { stackData } from '../data/stacks'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export default function Skills() {
  const { lang } = useLang()
  const t = translations[lang].skills

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-fadeIn">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stackData).map(([category, skills]) => (
            <SkillsCategoryCard key={category} category={category} skills={skills} />
          ))}
        </div>
      </div>
    </section>
  )
}
