import { useState, useEffect } from 'react'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { Quote, User } from 'lucide-react'
import axios from 'axios'

import { TestimonialSkeleton } from '../components/Skeletons'

export default function Testimonials() {
  const { lang } = useLang()
  const t = translations[lang].testimonials
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/testimonials`)
      .then(res => {
        setTestimonials(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (!loading && testimonials.length === 0) return null

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-16 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <TestimonialSkeleton key={i} />)
          ) : (
            testimonials.map((testi) => (
            <div 
              key={testi.id} 
              className="bg-blue-50/50 dark:bg-gray-800/50 p-8 rounded-2xl relative shadow-sm border border-blue-100 dark:border-gray-800"
            >
              <Quote className="absolute top-6 right-6 text-blue-200 dark:text-blue-900/40" size={48} />
              
              <p className="text-gray-700 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                "{testi.content[lang] || testi.content.fr}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                {testi.image ? (
                  <img src={testi.image} alt={testi.name} className="w-14 h-14 rounded-full object-cover shadow-md" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md">
                    <User size={24} />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testi.name}</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {testi.role && (testi.role[lang] || testi.role.fr)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </section>
  )
}
