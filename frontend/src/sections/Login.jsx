import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogIn, ArrowLeft } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSuccess = (response) => {
    login(response)
    navigate('/admin')
  }

  const handleError = () => {
    alert('Erreur d\'authentification Google')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Shapes for Glassmorphism effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

      <div className="z-10 w-full max-w-md px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Retour au site
        </button>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
            <LogIn size={32} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Administration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Connectez-vous pour mettre à jour votre portfolio
          </p>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
              theme="filled_blue"
              shape="pill"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
