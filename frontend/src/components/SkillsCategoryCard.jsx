import SkillsList from './SkillsList'

export default function SkillsCategoryCard({ category, skills }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-600 dark:border-blue-400">
        {category}
      </h3>

      <SkillsList skills={skills} variant="badge" />
    </div>
  )
}
