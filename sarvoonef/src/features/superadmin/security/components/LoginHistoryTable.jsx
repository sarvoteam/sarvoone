import React from 'react';

export default function LoginHistoryTable({ attempts }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
      <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Timestamp</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Account Email</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>IP Footprint</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>User Agent</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map(att => (
            <tr key={att.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={{ padding: '16px 20px', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{att.timestamp}</td>
              <td style={{ padding: '16px 20px', fontWeight: 600, color: '#1f2937', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{att.email}</td>
              <td style={{ padding: '16px 20px', fontFamily: 'monospace', color: '#4b5563', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>{att.ip}</td>
              <td style={{ padding: '16px 20px', color: '#6b7280', verticalAlign: 'middle' }}>{att.agent}</td>
              <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                <span style={{
                  display: 'inline-flex',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: att.status.includes('Success') ? '#ecfdf5' : '#fef2f2',
                  color: att.status.includes('Success') ? '#047857' : '#b91c1c',
                  border: `1px solid ${att.status.includes('Success') ? '#a7f3d0' : '#fecaca'}`,
                  whiteSpace: 'nowrap'
                }}>
                  {att.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
