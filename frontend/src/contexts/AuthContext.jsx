import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('adminToken'))
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL

  useEffect(() => {
    if (token) {
      // Pour l'instant on décode sommairement le JWT ou on vérifie juste sa présence
      // Dans une version plus poussée, on ferait un fetch /api/admin/me ici
      setIsAuthenticated(true)
    }
  }, [token])

  const login = (googleResponse) => {
    const credential = googleResponse.credential
    // On pourrait décoder le credential (qui est un JWT) pour vérifier l'email côté client
    // via une bibliothèque comme jwt-decode, mais ici on va rester simple.
    
    setToken(credential)
    localStorage.setItem('adminToken', credential)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
