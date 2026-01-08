import { socialLinks } from "../data/socialLinks";
import { useLang } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export default function Footer({ scrollToSection, refs }) {
  const currentYear = new Date().getFullYear();
  const { lang } = useLang();
  const t = translations[lang].footer;

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-10 px-4 border-t border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          {socialLinks.slice(0, 4).map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform duration-300"
              aria-label={name}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center gap-6 mb-6 text-sm">
          <button
            onClick={() => scrollToSection(refs.projectsRef)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {translations[lang].nav.projects}
          </button>
          <button
            onClick={() => scrollToSection(refs.skillsRef)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {translations[lang].nav.skills}
          </button>
          <button
            onClick={() => scrollToSection(refs.contactRef)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {translations[lang].nav.contact}
          </button>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} Eméric R. S. TOGNON. {t.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
