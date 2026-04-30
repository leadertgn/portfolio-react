import { useState } from 'react';
import { X, Upload, Save } from 'lucide-react';

export default function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    {
      title: project?.title || { fr: '', en: '' },
      description: project?.description || { fr: '', en: '' },
      links: project?.links || { Github: '', Website: '' },
      stack: project?.stack || '',
      order: project?.order || 0,
      caseStudy: project?.caseStudy || {
        fr: { problem: '', solution: '', results: '' },
        en: { problem: '', solution: '', results: '' }
      }
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
      ? formData.stack.split(',').map(s => s.trim()).filter(s => s !== '') 
      : formData.stack;
    data.append('stack', JSON.stringify(stackArray));
    
    // Ajout du case study seulement s'il est au moins partiellement rempli
    const hasCaseStudy = formData.caseStudy && formData.caseStudy.fr && (formData.caseStudy.fr.problem || (formData.caseStudy.en && formData.caseStudy.en.problem));
    data.append('caseStudy', hasCaseStudy ? JSON.stringify(formData.caseStudy) : JSON.stringify(null));

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Liens Dynamiques */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium dark:text-gray-300">Liens du Projet</label>
            <button 
              type="button" 
              onClick={() => {
                const newKey = prompt('Nom du lien (ex: Youtube, Figma, PlayStore) :');
                if (newKey) setFormData({...formData, links: {...formData.links, [newKey]: ''}});
              }}
              className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              <Upload size={14}/> Ajouter un lien
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.links || {}).map(([key, url]) => (
              <div key={key} className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 flex justify-between">
                  {key}
                  <button type="button" className="text-red-400 hover:text-red-600" onClick={() => {
                    const newLinks = {...formData.links};
                    delete newLinks[key];
                    setFormData({...formData, links: newLinks});
                  }}>Retirer</button>
                </label>
                <input
                  type="url"
                  placeholder={`URL pour ${key}`}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={url}
                  onChange={(e) => setFormData({...formData, links: {...formData.links, [key]: e.target.value}})}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Case Study (Optionnel) */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="text-lg font-bold mb-4 dark:text-white">Étude de Cas (Optionnel)</h3>
          <p className="text-sm text-gray-500 mb-4">Remplissez ces champs pour qu'un bouton "Voir l'étude de cas" s'affiche sur le projet.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FR */}
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">Français</h4>
              <textarea placeholder="Le Problème" rows="2" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.caseStudy?.fr?.problem || ''} onChange={(e) => setFormData({...formData, caseStudy: {...formData.caseStudy, fr: {...formData.caseStudy?.fr, problem: e.target.value}}})} />
              <textarea placeholder="La Solution" rows="2" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.caseStudy?.fr?.solution || ''} onChange={(e) => setFormData({...formData, caseStudy: {...formData.caseStudy, fr: {...formData.caseStudy?.fr, solution: e.target.value}}})} />
              <textarea placeholder="Les Résultats" rows="2" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.caseStudy?.fr?.results || ''} onChange={(e) => setFormData({...formData, caseStudy: {...formData.caseStudy, fr: {...formData.caseStudy?.fr, results: e.target.value}}})} />
            </div>
            {/* EN */}
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">English</h4>
              <textarea placeholder="The Problem" rows="2" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.caseStudy?.en?.problem || ''} onChange={(e) => setFormData({...formData, caseStudy: {...formData.caseStudy, en: {...formData.caseStudy?.en, problem: e.target.value}}})} />
              <textarea placeholder="The Solution" rows="2" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.caseStudy?.en?.solution || ''} onChange={(e) => setFormData({...formData, caseStudy: {...formData.caseStudy, en: {...formData.caseStudy?.en, solution: e.target.value}}})} />
              <textarea placeholder="The Results" rows="2" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.caseStudy?.en?.results || ''} onChange={(e) => setFormData({...formData, caseStudy: {...formData.caseStudy, en: {...formData.caseStudy?.en, results: e.target.value}}})} />
            </div>
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
