import React from 'react';

export default function AuditLogTable({ logs }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Timestamp</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>User / Admin</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Action</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Resource Mapped</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>IP footprints</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', color: '#6b7280' }}>{log.timestamp}</td>
              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1f2937' }}>{log.user}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: log.action.includes('Delete') ? '#fee2e2' : log.action.includes('Create') ? '#d1fae5' : '#f3f4f6',
                  color: log.action.includes('Delete') ? '#ef4444' : log.action.includes('Create') ? '#059669' : '#4b5563'
                }}>
                  {log.action}
                </span>
              </td>
              <td style={{ padding: '12px 16px', color: '#4b5563' }}>{log.resource}</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6b7280' }}>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
