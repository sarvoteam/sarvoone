import React from 'react';

export default function JobQueueTable({ jobs, onTrigger, onCancel }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Job Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Queue Worker</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Frequency</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Last Run</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <strong style={{ color: '#1f2937' }}>{job.name}</strong>
              </td>
              <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#4b5563' }}>{job.queue}</td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{job.frequency}</td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{job.lastRun}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: job.status === 'Idle' ? '#d1fae5' : '#e0f2fe',
                  color: job.status === 'Idle' ? '#065f46' : '#0369a1'
                }}>
                  {job.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    onClick={() => onTrigger(job.id, job.name)}
                    style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#059669', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Run Now
                  </button>
                  <button
                    onClick={() => onCancel(job.id, job.name)}
                    style={{ border: '1px solid #fee2e2', backgroundColor: '#fff', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
