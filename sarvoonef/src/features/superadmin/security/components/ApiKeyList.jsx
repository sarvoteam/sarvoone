import React from 'react';
import { Key, Trash2 } from 'lucide-react';

export default function ApiKeyList({ apiKeys, onRevoke }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
      <table style={{ width: '100%', minWidth: '950px', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Key Name</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>API Token Prefix</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Authorized Scopes</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Created Date</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Status</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map(key => (
            <tr key={key.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              {/* Key Name */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Key size={14} />
                  </div>
                  <strong style={{ color: '#1f2937', whiteSpace: 'nowrap' }}>{key.name}</strong>
                </div>
              </td>
              
              {/* Token Prefix */}
              <td style={{ padding: '16px 20px', fontFamily: 'monospace', color: '#4b5563', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{key.token}</td>
              
              {/* Scopes */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: 600 }}>{key.scopes}</span>
              </td>
              
              {/* Created Date */}
              <td style={{ padding: '16px 20px', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{key.created}</td>
              
              {/* Status */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                <span style={{ 
                  display: 'inline-flex',
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: key.status === 'Active' ? '#ecfdf5' : '#fef2f2',
                  color: key.status === 'Active' ? '#047857' : '#b91c1c',
                  border: `1px solid ${key.status === 'Active' ? '#a7f3d0' : '#fecaca'}`,
                  whiteSpace: 'nowrap'
                }}>
                  {key.status}
                </span>
              </td>
              
              {/* Actions */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                {key.status === 'Active' ? (
                  <button
                    onClick={() => onRevoke(key.id)}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      border: '1px solid #fecaca', 
                      color: '#b91c1c', 
                      backgroundColor: '#fef2f2', 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontSize: '12px', 
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fee2e2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                    }}
                  >
                    <Trash2 size={12} /> Revoke
                  </button>
                ) : (
                  <span style={{ fontSize: '11.5px', color: '#9ca3af', fontStyle: 'italic' }}>No actions available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
