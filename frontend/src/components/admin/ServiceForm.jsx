import { useState } from 'react';
import { Plus, Trash2, Tag, Edit, LayoutDashboard, Monitor, Code, Smartphone, Database, Server, PenTool } from 'lucide-react';
import { serviceService } from '../../services/api';
import toast from 'react-hot-toast';

// Liste des icônes disponibles pour les services
const ICONS = {
  Monitor, Code, Smartphone, Database, Server, PenTool, LayoutDashboard
};

export default function ServiceForm({ services, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: { fr: '', en: '' },
    description: { fr: '', en: '' },
    icon: 'Monitor',
    price: { fr: '', en: '' },
    order: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await serviceService.update(editingId, formData);
        toast.success('Service mis à jour');
      } else {
        await serviceService.create(formData);
        toast.success('Service ajouté');
      }
      setFormData({ title: { fr: '', en: '' }, description: { fr: '', en: '' }, icon: 'Monitor', price: { fr: '', en: '' }, order: 0 });
      setEditingId(null);
      onRefresh();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du service');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce service ?')) {
      try {
        await serviceService.delete(id);
        toast.success('Service supprimé');
        onRefresh();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setFormData({
      title: s.title,
      description: s.description,
      icon: s.icon,
      price: s.price || { fr: '', en: '' },
      order: s.order
    });
  };

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">{editingId ? 'Modifier Service' : 'Nouveau Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Titre (FR)" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.title.fr} onChange={e => setFormData({...formData, title: {...formData.title, fr: e.target.value}})} />
            <input type="text" placeholder="Title (EN)" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.title.en} onChange={e => setFormData({...formData, title: {...formData.title, en: e.target.value}})} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea placeholder="Description (FR)" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.description.fr} onChange={e => setFormData({...formData, description: {...formData.description, fr: e.target.value}})} />
            <textarea placeholder="Description (EN)" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.description.en} onChange={e => setFormData({...formData, description: {...formData.description, en: e.target.value}})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <select className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})}>
                {Object.keys(ICONS).map(icon => <option key={icon} value={icon}>{icon}</option>)}
             </select>
             <div className="flex items-center gap-2">
                <input type="text" placeholder="Prix optionnel (FR) ex: À partir de 500€" className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.price.fr} onChange={e => setFormData({...formData, price: {...formData.price, fr: e.target.value}})} />
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({ title: { fr: '', en: '' }, description: { fr: '', en: '' }, icon: 'Monitor', price: { fr: '', en: '' }, order: 0 })}} className="text-gray-500">Annuler</button>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={18} /> {editingId ? 'Mettre à jour' : 'Ajouter Service'}
            </button>
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(s => {
          const IconComponent = ICONS[s.icon] || Monitor;
          return (
            <div key={s.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="font-bold dark:text-white">{s.title.fr}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{s.description.fr}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleEdit(s)} className="text-blue-500 hover:text-blue-600"><Edit size={18}/></button>
                <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-600"><Trash2 size={18}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
