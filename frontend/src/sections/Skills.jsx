import { useState, useEffect } from 'react'
import SkillsCategoryCard from '../components/SkillsCategoryCard'
import { SkillSkeleton } from '../components/Skeletons'
import { skillService } from '../services/api'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { stackData as localSkills } from '../data/stacks'

export default function Skills() {
  const { lang } = useLang()
  const t = translations[lang].skills
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillService.getAll()
        setCategories(data)
      } catch (error) {
        console.error('Erreur lors du chargement des compétences, chargement des données locales:', error)
        
        // Formatage pour correspondre au format attendu par le frontend
        const localFormatted = Object.entries(localSkills).map(([catName, skillsList], index) => ({
          id: index,
          name: { fr: catName, en: catName },
          skills: skillsList.map((skill, sIndex) => ({ id: sIndex, name: skill.name }))
        }))
        setCategories(localFormatted)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2 animate-fadeIn">
          {t.title}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SkillSkeleton key={index} />
            ))
          ) : (
            categories.map((category) => (
              <SkillsCategoryCard 
                key={category.id} 
                category={category.name[lang] || category.name} 
                skills={category.skills} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
