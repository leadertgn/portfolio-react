import { useState } from 'react';
import { Plus, Trash2, Edit, User, Upload } from 'lucide-react';
import { testimonialService } from '../../services/api';
import toast from 'react-hot-toast';

export default function TestimonialForm({ testimonials, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: { fr: '', en: '' },
    content: { fr: '', en: '' },
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', JSON.stringify(formData.role));
      data.append('content', JSON.stringify(formData.content));
      data.append('order', formData.order);
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await testimonialService.update(editingId, data);
        toast.success('Témoignage mis à jour');
      } else {
        await testimonialService.create(data);
        toast.success('Témoignage ajouté');
      }
      setFormData({ name: '', role: { fr: '', en: '' }, content: { fr: '', en: '' }, order: 0 });
      setImageFile(null);
      setEditingId(null);
      onRefresh();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du témoignage');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce témoignage ?')) {
      try {
        await testimonialService.delete(id);
        toast.success('Témoignage supprimé');
        onRefresh();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      name: t.name,
      role: t.role || { fr: '', en: '' },
      content: t.content,
      order: t.order
    });
    setImageFile(null);
  };

  return (
    <div className="space-y-8">
      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">{editingId ? 'Modifier Témoignage' : 'Nouveau Témoignage'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nom de la personne" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <div className="flex gap-2">
              <input type="text" placeholder="Rôle (FR)" className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.role.fr} onChange={e => setFormData({...formData, role: {...formData.role, fr: e.target.value}})} />
              <input type="text" placeholder="Role (EN)" className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.role.en} onChange={e => setFormData({...formData, role: {...formData.role, en: e.target.value}})} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea placeholder="Témoignage (FR)" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.content.fr} onChange={e => setFormData({...formData, content: {...formData.content, fr: e.target.value}})} />
            <textarea placeholder="Testimonial (EN)" required className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.content.en} onChange={e => setFormData({...formData, content: {...formData.content, en: e.target.value}})} />
          </div>

          <div className="flex items-center gap-4">
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 ml-auto">
              <Plus size={18} /> {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({ name: '', role: { fr: '', en: '' }, content: { fr: '', en: '' }, order: 0 })}} className="text-gray-500">Annuler</button>}
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex justify-between items-start">
            <div className="flex gap-4">
              {t.image ? (
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  <User size={24} />
                </div>
              )}
              <div>
                <h3 className="font-bold dark:text-white">{t.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400">{t.role.fr}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic line-clamp-2">"{t.content.fr}"</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(t)} className="text-blue-500 hover:text-blue-600"><Edit size={18}/></button>
              <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-600"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
