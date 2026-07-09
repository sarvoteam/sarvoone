import React from 'react';
import { Terminal, Shield } from 'lucide-react';

export default function ApiRouteList({ routes, onTestRoute }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Endpoint Route</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>HTTP Method</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Rate Limit</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Scope Required</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(r => (
            <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f3e8ff', color: '#7c3aed' }}>
                    <Terminal size={14} />
                  </div>
                  <div>
                    <strong style={{ color: '#1f2937', fontFamily: 'monospace' }}>{r.path}</strong>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{r.description}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '3px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: r.method === 'GET' ? '#d1fae5' : r.method === 'POST' ? '#e0f2fe' : '#fef3c7',
                  color: r.method === 'GET' ? '#065f46' : r.method === 'POST' ? '#0369a1' : '#b45309'
                }}>
                  {r.method}
                </span>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{r.rateLimit}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#4b5563', fontWeight: 600 }}>
                  <Shield size={12} /> {r.scope}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onTestRoute(r.path)}
                  style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#4b5563', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Test Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
