export default function LinkCard({ icon, url, name }) {
  const Icon = icon
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 group"
      aria-label={name}
    >
      <Icon size={24} className="group-hover:scale-110 transition-transform" />
    </a>
  )
}