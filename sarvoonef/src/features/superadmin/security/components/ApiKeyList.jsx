import React from 'react';
import { Key, Trash2 } from 'lucide-react';

export default function ApiKeyList({ apiKeys, onRevoke }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Key Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>API Token Prefix</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Authorized Scopes</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Created Date</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map(key => (
            <tr key={key.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                    <Key size={14} />
                  </div>
                  <strong style={{ color: '#1f2937' }}>{key.name}</strong>
                </div>
              </td>
              <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#4b5563' }}>{key.token}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: 600 }}>{key.scopes}</span>
              </td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{key.created}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: key.status === 'Active' ? '#d1fae5' : '#fee2e2',
                  color: key.status === 'Active' ? '#065f46' : '#b91c1c'
                }}>
                  {key.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onRevoke(key.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #fee2e2', color: '#ef4444', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 600 }}
                >
                  <Trash2 size={12} /> Revoke
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
