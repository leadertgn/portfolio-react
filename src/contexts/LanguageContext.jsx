import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    // Détection automatique de la langue du navigateur
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language')
      if (savedLang) return savedLang
      
      const browserLang = navigator.language.split('-')[0]
      return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr'
    }
    return 'fr'
  })

  const toggleLang = () => {
    setLang(prev => {
      const newLang = prev === 'fr' ? 'en' : 'fr'
      localStorage.setItem('language', newLang)
      return newLang
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang must be used within LanguageProvider')
  }
  return context
}