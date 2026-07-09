import React, { useState } from 'react';
import MasterCategoryList from '../components/MasterCategoryList';
import { Plus } from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Antibiotics & Pharma', module: 'Pharmacy POS Inventory', code: 'MED_PHARMA_01' },
  { id: 2, name: 'Cotton Garments & Textiles', module: 'Apparel POS Inventory', code: 'CLOTH_COTTON_02' },
  { id: 3, name: 'Smartphones & Accessories', module: 'Electronics Retail Store', code: 'ELEC_MOBILE_03' },
  { id: 4, name: 'Perishable Dairy Products', module: 'Grocery POS Storefront', code: 'GROC_DAIRY_04' }
];

export default function MasterCategories() {
  const [categories, setCategories] = useState(initialCategories);

  const handleEdit = (category) => {
    const nextName = prompt('Edit Category name:', category.name);
    if (nextName) {
      setCategories(categories.map(c => c.id === category.id ? { ...c, name: nextName } : c));
    }
  };

  const handleDelete = (id) => {
    if (confirm('Delete this master category reference? Sub-tenants mapping may break.')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleCreate = () => {
    const name = prompt('Enter Master Category Name:');
    const module = prompt('Enter Target ERP Module Scope:');
    if (name) {
      setCategories([...categories, {
        id: Date.now(),
        name,
        module: module || 'General POS',
        code: `GEN_CODE_${Math.floor(Math.random() * 100)}`
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Master Categories</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure default industry category tags injected into merchant tenant inventory catalogs.</p>
        </div>

        <button 
          onClick={handleCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <MasterCategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
