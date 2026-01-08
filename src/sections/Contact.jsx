import { useState } from "react"
import { useLang } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { Send } from 'lucide-react'

export default function Contact() {
  const { lang } = useLang()
  const t = translations[lang].contact
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [status, setStatus] = useState('')
  const isFormInvalid = Object.values(formData).some(v => v.trim() === "")
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

const handleSubmit = (e) => {
  e.preventDefault()

  // Vérifie s'il y a un champ vide ou uniquement des espaces
  const hasEmptyField = Object.values(formData).some(
    value => value.trim() === ""
  )

  if (hasEmptyField) {
    setStatus('error')
    return
  }

  // Simulation envoi
  setStatus('sending')

  setTimeout(() => {
    console.log('Form submitted:', formData)
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })

    setTimeout(() => setStatus(''), 3000)
  }, 1000)
}


  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-fadeIn">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-12 rounded-full" />
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-6">
            {/* Nom */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                {t.name}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all outline-none"
                placeholder={lang === 'fr' ? 'Votre nom' : 'Your name'}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                {t.email}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all outline-none"
                placeholder={lang === 'fr' ? 'votre@email.com' : 'your@email.com'}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                {t.message}
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all resize-none outline-none"
                placeholder={lang === 'fr' ? 'Votre message...' : 'Your message...'}
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={status === 'sending' | isFormInvalid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.sending}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t.send}
                </>
              )}
            </button>

            {/* Success/Error Messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-center font-medium animate-slideDown">
                {t.success}
              </div>
            )}
            
            {status === 'error' && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-center font-medium animate-slideDown">
                {t.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}