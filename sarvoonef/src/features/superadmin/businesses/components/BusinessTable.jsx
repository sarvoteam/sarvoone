import React from 'react';
import { User, Building, Trash2, Ban, CheckCircle } from 'lucide-react';

export default function BusinessTable({ businesses, onToggleStatus, onDelete }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Business Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Owner / Email</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Category</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Branches</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Active Plan</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map(b => (
            <tr key={b.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>ID: Tenant-{b.id}092</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={14} style={{ color: '#6b7280' }} />
                  <div>
                    <div style={{ fontWeight: 500, color: '#4b5563' }}>{b.owner}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{b.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{b.category}</td>
              <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1f2937' }}>{b.branches}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: b.plan.includes('Enterprise') ? '#2563eb' : '#4b5563' }}>
                  {b.plan}
                </span>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: b.status === 'Active' ? '#d1fae5' : '#fee2e2',
                  color: b.status === 'Active' ? '#065f46' : '#b91c1c'
                }}>
                  {b.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onToggleStatus(b.id)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      border: '1px solid #e5e7eb', 
                      padding: '6px 10px', 
                      borderRadius: '6px', 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      color: b.status === 'Active' ? '#d97706' : '#059669', 
                      cursor: 'pointer', 
                      backgroundColor: '#fff' 
                    }}
                  >
                    {b.status === 'Active' ? <Ban size={12} /> : <CheckCircle size={12} />}
                    {b.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => onDelete(b.id, b.name)}
                    style={{ 
                      border: '1px solid #fee2e2', 
                      padding: '6px', 
                      borderRadius: '6px', 
                      color: '#ef4444', 
                      cursor: 'pointer', 
                      backgroundColor: '#fff' 
                    }}
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
