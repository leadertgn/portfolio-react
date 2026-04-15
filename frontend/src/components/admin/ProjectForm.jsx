import { useState } from 'react';
import { X, Upload, Save } from 'lucide-react';

export default function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    project || {
      title: { fr: '', en: '' },
      description: { fr: '', en: '' },
      links: { Github: '', Website: '' },
      stack: '',
      order: 0,
    }
  );
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(project?.image || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', JSON.stringify(formData.title));
    data.append('description', JSON.stringify(formData.description));
    data.append('links', JSON.stringify(formData.links));
    
    // Si la stack est une chaine, on l'envoie en tableau
    const stackArray = typeof formData.stack === 'string' 
      ? formData.stack.split(',').map(s => s.trim()) 
      : formData.stack;
    data.append('stack', JSON.stringify(stackArray));
    
    data.append('order', formData.order);
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await onSave(data);
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {project ? 'Modifier le projet' : 'Nouveau Projet'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-red-500"><X /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titres */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Titre (FR)</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.title.fr}
              onChange={(e) => setFormData({...formData, title: {...formData.title, fr: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title (EN)</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.title.en}
              onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description (FR)</label>
            <textarea
              rows="3"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.description.fr}
              onChange={(e) => setFormData({...formData, description: {...formData.description, fr: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description (EN)</label>
            <textarea
              rows="3"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.description.en}
              onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
            />
          </div>
        </div>

        {/* Liens */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">URL GitHub</label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.links.Github}
              onChange={(e) => setFormData({...formData, links: {...formData.links, Github: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">URL Website</label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.links.Website}
              onChange={(e) => setFormData({...formData, links: {...formData.links, Website: e.target.value}})}
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Stack (séparer par des virgules)</label>
          <input
            type="text"
            placeholder="React, Tailwind, Node.js"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={Array.isArray(formData.stack) ? formData.stack.join(', ') : formData.stack}
            onChange={(e) => setFormData({...formData, stack: e.target.value})}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Image du projet</label>
          <div className="flex items-center gap-4">
            <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload className="text-gray-400" />
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-blue-400"
        >
          {loading ? 'Sauvegarde...' : <><Save size={20} /> Sauvegarder</>}
        </button>
      </form>
    </div>
  );
}
