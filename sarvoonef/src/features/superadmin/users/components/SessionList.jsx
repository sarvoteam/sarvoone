import React from 'react';
import { Laptop, Smartphone, Trash2 } from 'lucide-react';

export default function SessionList({ sessions, onRevoke }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Device / Browser</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>User Account</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>IP Address</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Location</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Last Active</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(sess => (
            <tr key={sess.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#7c3aed', padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff' }}>
                    {sess.device === 'Mobile' ? <Smartphone size={16} /> : <Laptop size={16} />}
                  </div>
                  <div>
                    <strong style={{ color: '#1f2937' }}>{sess.browser}</strong>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{sess.os}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#4b5563' }}>{sess.userName}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{sess.email}</div>
                </div>
              </td>
              <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#4b5563' }}>{sess.ip}</td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{sess.location}</td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{sess.lastActive}</td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onRevoke(sess.id, sess.userName)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #fee2e2', color: '#ef4444', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 600 }}
                >
                  <Trash2 size={12} /> Terminate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
