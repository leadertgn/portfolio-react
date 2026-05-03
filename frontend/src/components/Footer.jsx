import { socialLinks } from '../data/socialLinks'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { Mail, MapPin, ChevronRight } from 'lucide-react'

export default function Footer({ scrollToSection, refs }) {
  const currentYear = new Date().getFullYear()
  const { lang } = useLang()
  const t = translations[lang].footer
  const nav = translations[lang].nav

  const menuItems = [
    { label: nav.projects, ref: refs.projectsRef },
    { label: nav.skills, ref: refs.skillsRef },
    { label: nav.services, ref: refs.servicesRef },
    { label: nav.about, ref: refs.aboutRef },
    { label: nav.contact, ref: refs.contactRef },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-16 px-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Branding Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leadertgn</h2>
          <p className="text-sm leading-relaxed max-w-xs italic">
            "{t.description}"
          </p>
          <div className="flex items-center gap-6 pt-2">
            {socialLinks.slice(0, 4).map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:-translate-y-1"
                aria-label={name}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Column */}
        <div className="space-y-6">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm">
            {t.quickLinks}
          </h3>
          <ul className="grid grid-cols-1 gap-3">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group text-sm"
                >
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact/Info Column */}
        <div className="space-y-6">
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm">
            Contact
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500" />
              <a href="mailto:tognonemeric@gmail.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Mail
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-blue-500" />
              <span>Cotonou, Bénin</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {currentYear} Eméric R. S. TOGNON. {t.rights}.</p>
        <div className="flex gap-6">
          <span className="hover:text-gray-900 dark:hover:text-white cursor-help">Coded with ❤️ and React</span>
          <span className="hover:text-gray-900 dark:hover:text-white cursor-help">Available for hire</span>
        </div>
      </div>
    </footer>
  )
}
