import { useState, useEffect } from 'react'
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { Monitor, Code, Smartphone, Database, Server, PenTool, LayoutDashboard } from 'lucide-react'
import axios from 'axios'

import { ServiceSkeleton } from '../components/Skeletons'

const ICONS = { Monitor, Code, Smartphone, Database, Server, PenTool, LayoutDashboard }

export default function Services() {
  const { lang } = useLang()
  const t = translations[lang].services
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/services`)
      .then(res => {
        setServices(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (!loading && services.length === 0) return null

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {t.title}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">{t.subtitle}</p>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-16 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <ServiceSkeleton key={i} />)
          ) : (
            services.map((service) => {
            const Icon = ICONS[service.icon] || Monitor
            return (
              <div 
                key={service.id} 
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title[lang] || service.title.fr}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-4">
                  {service.description[lang] || service.description.fr}
                </p>
                {service.price && (service.price[lang] || service.price.fr) && (
                  <div className="mt-auto inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-lg">
                    {service.price[lang] || service.price.fr}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
      </div>
    </section>
  )
}
