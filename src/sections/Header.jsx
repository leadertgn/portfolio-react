import { useState } from 'react'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

function Header({ scrollToSection, refs }) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLang()
  const t = translations[lang].nav

  const menuItems = [
    { label: t.projects, ref: refs.projectsRef, id: 'projects' },
    { label: t.skills, ref: refs.skillsRef, id: 'skills' },
    { label: t.about, ref: refs.aboutRef, id: 'about' },
    { label: t.contact, ref: refs.contactRef, id: 'contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo = lien SEO */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(refs.heroRef)
            }}
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Leadertgn
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.ref)
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-gray-700" />
              ) : (
                <Sun size={20} className="text-gray-300" />
              )}
            </button>

            {/* Language */}
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4 animate-slideDown">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.ref)
                    setIsOpen(false)
                  }}
                  className="block w-full py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header
