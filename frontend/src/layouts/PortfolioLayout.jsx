import { useRef } from 'react'
import Skills from '../sections/Skills.jsx'
import Projects from '../sections/Projects.jsx'
import Hero from '../components/Hero.jsx'
import About from '../sections/About.jsx'
import Services from '../sections/Services.jsx'
import Resume from '../sections/Resume.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Contact from '../sections/Contact.jsx'
import Footer from '../components/Footer.jsx'
import Header from '../sections/Header.jsx'

export default function PortfolioLayout() {
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const servicesRef = useRef(null)
  const resumeRef = useRef(null)
  const aboutRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const refs = { heroRef, projectsRef, skillsRef, servicesRef, resumeRef, aboutRef, testimonialsRef, contactRef }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header scrollToSection={scrollToSection} refs={refs} />
      
      <div ref={heroRef}>
        <Hero scrollToSection={scrollToSection} refs={refs} />
      </div>

      <div ref={projectsRef}>
        <Projects />
      </div>

      <div ref={skillsRef}>
        <Skills />
      </div>

      <div ref={servicesRef}>
        <Services />
      </div>

      <div ref={resumeRef}>
        <Resume resumeRef={resumeRef} />
      </div>

      <div ref={aboutRef}>
        <About />
      </div>

      <div ref={testimonialsRef}>
        <Testimonials />
      </div>

      <div ref={contactRef}>
        <Contact />
      </div>

      <Footer scrollToSection={scrollToSection} refs={refs} />
    </div>
  )
}
