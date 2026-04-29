import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, LayoutDashboard, PlusCircle, Settings, User, 
  Briefcase, Edit, Trash2, Globe, Github, Menu, X 
} from 'lucide-react'
import { projectService, skillService } from '../services/api'
import ProjectForm from '../components/admin/ProjectForm'
import SkillForm from '../components/admin/SkillForm'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects()
    } else if (activeTab === 'skills') {
      fetchSkills()
    }
  }, [activeTab])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const data = await projectService.getAll()
      setProjects(data)
    } finally {
      setLoading(false)
    }
  }

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const data = await skillService.getAll()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSaveProject = async (formData) => {
    try {
      if (editingProject) {
        await projectService.update(editingProject.id, formData)
        toast.success('Projet mis à jour avec succès')
      } else {
        await projectService.create(formData)
        toast.success('Projet créé avec succès')
      }
      setIsFormOpen(false)
      setEditingProject(null)
      fetchProjects()
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du projet')
    }
  }

  const handleDeleteProject = async (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      try {
        await projectService.delete(id)
        toast.success('Projet supprimé')
        fetchProjects()
      } catch (error) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors">
      {/* Overlay Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <ProjectForm 
            project={editingProject} 
            onSave={handleSaveProject} 
            onCancel={() => { setIsFormOpen(false); setEditingProject(null); }} 
          />
        </div>
      )}

      {/* Sidebar Desktop & Mobile */}
      <aside className={`${mobileMenuOpen ? 'fixed inset-0 z-40 flex' : 'hidden'} md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform`}>
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
          <button className="md:hidden text-gray-500" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <LayoutDashboard size={20} /> Aperçu
          </button>
          <button 
            onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <Briefcase size={20} /> Projets
          </button>
          <button 
            onClick={() => { setActiveTab('skills'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'skills' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <Settings size={20} /> Compétences
          </button>
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-500 dark:text-gray-300" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
              {activeTab === 'overview' ? 'Aperçu' : activeTab === 'projects' ? 'Gestion des Projets' : 'Gestion des Compétences'}
            </h1>
          </div>
          {activeTab === 'projects' && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-500/30"
            >
              <PlusCircle size={20} /> Nouveau Projet
            </button>
          )}
        </header>

        {/* Content Tabs */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Bienvenue dans l'espace admin</h2>
            <p className="text-gray-600 dark:text-gray-400">Utilisez la barre latérale pour gérer vos projets et compétences.</p>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 flex gap-4">
                <img src={p.image} className="w-24 h-16 object-cover rounded-lg" alt={p.title.fr} />
                <div className="flex-1">
                  <h3 className="font-bold dark:text-white">{p.title.fr}</h3>
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => { setEditingProject(p); setIsFormOpen(true); }} className="text-blue-500 flex items-center gap-1 text-sm"><Edit size={14}/> Éditer</button>
                    <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 flex items-center gap-1 text-sm"><Trash2 size={14}/> Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
            {!loading && projects.length === 0 && <p className="text-gray-500">Aucun projet pour le moment.</p>}
          </div>
        )}

        {activeTab === 'skills' && (
          <SkillForm categories={categories} onRefresh={fetchSkills} />
        )}
      </main>
    </div>
  )
}
