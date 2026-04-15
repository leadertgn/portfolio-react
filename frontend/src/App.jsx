import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import PortfolioLayout from './layouts/PortfolioLayout.jsx'
import Login from './sections/Login.jsx'
import AdminDashboard from './sections/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          {/* Routes Publiques : Portfolio */}
          <Route path="/" element={<PortfolioLayout />} />
          
          {/* Route de Connexion */}
          <Route path="/login" element={<Login />} />

          {/* Routes Protégées : Dashboard Admin */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
