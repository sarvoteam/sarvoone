import React from 'react';
import { BookOpen, Edit2, Trash2 } from 'lucide-react';

export default function KbArticleList({ articles, onEdit, onDelete }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Article Title</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Category</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Views</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(art => (
            <tr key={art.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                    <BookOpen size={14} />
                  </div>
                  <strong style={{ color: '#1f2937' }}>{art.title}</strong>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{art.category}</td>
              <td style={{ padding: '14px 16px', color: '#6b7280', fontWeight: 600 }}>{art.views.toLocaleString()}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: art.status === 'Published' ? '#d1fae5' : '#e5e7eb',
                  color: art.status === 'Published' ? '#065f46' : '#374151'
                }}>
                  {art.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onEdit(art)}
                    style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#4b5563', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    <Edit2 size={12} />
                  </button>
                  <button 
                    onClick={() => onDelete(art.id)}
                    style={{ border: '1px solid #fee2e2', backgroundColor: '#fff', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
