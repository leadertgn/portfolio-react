import { useRef } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'

import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Hero from "./components/Hero.jsx"
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './components/Footer.jsx'
import Header from './sections/Header.jsx'

function AppContent() {
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const refs = { heroRef, projectsRef, skillsRef, aboutRef, contactRef }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header scrollToSection={scrollToSection} refs={refs} />
      
      <div ref={heroRef}>
        <Hero />
      </div>
      
      <div ref={projectsRef}>
        <Projects />
      </div>
      
      <div ref={skillsRef}>
        <Skills />
      </div>
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={contactRef}>
        <Contact />
      </div>
      
      <Footer scrollToSection={scrollToSection} refs={refs} />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App