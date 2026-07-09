import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import CategoryModal from '../components/CategoryModal';
import { Plus } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

export default function BusinessCategories() {
  const { categories, loading, addCategory, editCategory, deleteCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (name, description) => {
    if (selectedCategory) {
      // In edit mode, we only edit name for now, but we can easily pass description too
      return editCategory(selectedCategory.id, name);
    } else {
      return addCategory(name, description);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Business Categories</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Define classification headers to organize onboarded business types.</p>
        </div>

        <button 
          onClick={handleAddClick}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
          Loading categories...
        </div>
      ) : (
        <CategoryList categories={categories} onEdit={handleEditClick} onDelete={deleteCategory} />
      )}

      {/* Add / Edit Category Modal */}
      <CategoryModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmit}
        category={selectedCategory}
      />
    </div>
  );
}
