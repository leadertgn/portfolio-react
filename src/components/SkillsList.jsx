export default function SkillsList({ skills, variant = 'list' }) {
  // Variant badge pour ProjectCard
  if (variant === 'badge') {
    return (
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill.name}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium transition-colors"
          >
            {skill.name}
          </span>
        ))}
      </div>
    )
  }
  
  // Variant list pour SkillsCategoryCard
  return (
    <ul className="space-y-2">
      {skills.map(skill => (
        <li
          key={skill.name}
          className="text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors"
        >
          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
          {skill.name}
        </li>
      ))}
    </ul>
  )
}