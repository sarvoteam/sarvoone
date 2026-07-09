import React from 'react';

export default function LoginHistoryTable({ attempts }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Timestamp</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Account Email</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>IP Footprint</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>User Agent</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map(att => (
            <tr key={att.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', color: '#6b7280' }}>{att.timestamp}</td>
              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1f2937' }}>{att.email}</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#4b5563' }}>{att.ip}</td>
              <td style={{ padding: '12px 16px', color: '#6b7280' }}>{att.agent}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: att.status === 'Success' ? '#d1fae5' : '#fee2e2',
                  color: att.status === 'Success' ? '#065f46' : '#b91c1c'
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
