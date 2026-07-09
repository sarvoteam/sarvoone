import React from 'react';
import { ToggleLeft, ToggleRight, Settings } from 'lucide-react';

export default function FlagList({ flags, onToggleFlag }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Feature Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Flag Key</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Targeting Scope</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flags.map(flag => (
            <tr key={flag.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div>
                  <strong style={{ color: '#1f2937' }}>{flag.name}</strong>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{flag.description}</div>
                </div>
              </td>
              <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '12.5px', color: '#4b5563' }}>{flag.key}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: flag.scope === 'Global' ? '#f3e8ff' : '#e0f2fe',
                  color: flag.scope === 'Global' ? '#7c3aed' : '#0369a1'
                }}>
                  {flag.scope}
                </span>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  fontWeight: 700, 
                  color: flag.enabled ? '#059669' : '#dc2626'
                }}>
                  {flag.enabled ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onToggleFlag(flag.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: flag.enabled ? '#059669' : '#9ca3af'
                  }}
                >
                  {flag.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
