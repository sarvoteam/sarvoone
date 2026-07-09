import React from 'react';

const limits = [
  { label: 'Total API Requests', current: 4890200, limit: 10000000, unit: 'requests' },
  { label: 'Cloud Storage Utilized', current: 24.5, limit: 100, unit: 'GB' },
  { label: 'Database Rows Inserted', current: 820000, limit: 2000000, unit: 'rows' },
  { label: 'Email Deliveries (Monthly)', current: 15200, limit: 50000, unit: 'emails' }
];

export default function ResourceMeter() {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#374151' }}>System Resource Consumption Logs</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {limits.map((lim, idx) => {
          const percent = Math.round((lim.current / lim.limit) * 100);
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4b5563' }}>
                <span style={{ fontWeight: 600 }}>{lim.label}</span>
                <span>{lim.current.toLocaleString()} / {lim.limit.toLocaleString()} {lim.unit} ({percent}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', backgroundColor: percent > 80 ? '#ef4444' : percent > 50 ? '#f59e0b' : '#7c3aed', borderRadius: '4px' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
