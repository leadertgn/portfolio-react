import { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { skillService } from '../../services/api';
import toast from 'react-hot-toast';

export default function SkillForm({ categories, onRefresh }) {
  const [newCategory, setNewCategory] = useState('');
  const [newSkills, setNewSkills] = useState({}); // { categoryId: 'skillName' }

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await skillService.createCategory({ name: { fr: newCategory, en: newCategory } });
      setNewCategory('');
      onRefresh();
      toast.success('Catégorie ajoutée');
    } catch (e) {
      toast.error('Erreur lors de l\'ajout de la catégorie');
    }
  };

  const handleAddSkill = async (categoryId) => {
    const skillName = newSkills[categoryId];
    if (!skillName?.trim()) return;
    try {
      await skillService.createSkill({ name: skillName, categoryId });
      setNewSkills({ ...newSkills, [categoryId]: '' });
      onRefresh();
      toast.success('Compétence ajoutée');
    } catch (e) { 
      toast.error('Erreur lors de l\'ajout de la compétence');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (confirm('Supprimer cette compétence ?')) {
      try {
        await skillService.deleteSkill(id);
        onRefresh();
        toast.success('Compétence supprimée');
      } catch (e) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (confirm('Supprimer cette catégorie et toutes ses compétences ?')) {
      try {
        await skillService.deleteCategory(id);
        onRefresh();
        toast.success('Catégorie supprimée');
      } catch (e) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Ajout Catégorie */}
      <form onSubmit={handleAddCategory} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Nouvelle catégorie (ex: Backend)" 
          className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Catégorie
        </button>
      </form>

      {/* Liste des catégories et skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4 border-b pb-2 dark:border-gray-700">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <Tag size={18} />
                {cat.name.fr || cat.name}
              </div>
              <button 
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Supprimer la catégorie"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {cat.skills.map(skill => (
                <span key={skill.id} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 dark:text-gray-300 group">
                  {skill.name}
                  <button onClick={() => handleDeleteSkill(skill.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ajouter compétence" 
                className="flex-1 text-sm p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={newSkills[cat.id] || ''}
                onChange={(e) => setNewSkills({ ...newSkills, [cat.id]: e.target.value })}
              />
              <button onClick={() => handleAddSkill(cat.id)} className="bg-gray-200 dark:bg-gray-600 p-1.5 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
