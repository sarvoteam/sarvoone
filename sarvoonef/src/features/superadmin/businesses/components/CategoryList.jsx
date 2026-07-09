import React from 'react';
import { Tag, Edit3, Trash2 } from 'lucide-react';

export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Category Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Description</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Active Stores</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>
                No categories found. Click "Add Category" to create one.
              </td>
            </tr>
          ) : (
            categories.map(cat => (
              <tr key={cat.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                      <Tag size={14} />
                    </div>
                    <strong style={{ color: '#1f2937' }}>{cat.name}</strong>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', color: '#4b5563' }}>{cat.description}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#7c3aed' }}>{cat.storeCount}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button 
                      onClick={() => onEdit(cat)}
                      style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#4b5563', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Edit3 size={12} />
                    </button>
                    <button 
                      onClick={() => onDelete(cat.id)}
                      style={{ border: '1px solid #fee2e2', backgroundColor: '#fff', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
