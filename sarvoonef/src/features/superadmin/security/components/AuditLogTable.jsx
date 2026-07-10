import React from 'react';

export default function AuditLogTable({ logs }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
      <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Timestamp</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>User / Admin</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Action</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Resource Mapped</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>IP Footprints</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={{ padding: '16px 20px', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
              <td style={{ padding: '16px 20px', fontWeight: 600, color: '#1f2937', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{log.user}</td>
              <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                <span style={{
                  display: 'inline-flex',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: log.action.includes('Delete') || log.action.includes('Suspend') ? '#fef2f2' : log.action.includes('Create') || log.action.includes('Onboard') ? '#ecfdf5' : '#f3f4f6',
                  color: log.action.includes('Delete') || log.action.includes('Suspend') ? '#b91c1c' : log.action.includes('Create') || log.action.includes('Onboard') ? '#047857' : '#4b5563',
                  border: `1px solid ${log.action.includes('Delete') || log.action.includes('Suspend') ? '#fecaca' : log.action.includes('Create') || log.action.includes('Onboard') ? '#a7f3d0' : '#e5e7eb'}`,
                  whiteSpace: 'nowrap'
                }}>
                  {log.action}
                </span>
              </td>
              <td style={{ padding: '16px 20px', color: '#4b5563', verticalAlign: 'middle' }}>{log.resource}</td>
              <td style={{ padding: '16px 20px', fontFamily: 'monospace', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
