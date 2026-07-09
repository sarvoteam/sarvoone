import React from 'react';
import { Mail, Edit2 } from 'lucide-react';

export default function TemplateSelector({ templates, onSelectTemplate }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Template Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Default Email Subject</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Target Recipient</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map(tpl => (
            <tr key={tpl.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                    <Mail size={14} />
                  </div>
                  <strong style={{ color: '#1f2937' }}>{tpl.name}</strong>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{tpl.subject}</td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{tpl.target}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: '#d1fae5',
                  color: '#065f46'
                }}>
                  Active
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onSelectTemplate(tpl)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#4b5563', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 600 }}
                >
                  <Edit2 size={12} /> Edit Template
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
