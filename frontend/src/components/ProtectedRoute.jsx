import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  // Si l'utilisateur n'est pas authentifié, on redirige vers /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Sinon, on rend la route imbriquée (l'Outlet)
  return <Outlet />
}

export default ProtectedRoute
