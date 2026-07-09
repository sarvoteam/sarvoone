import React from 'react';
import { Send, BarChart2 } from 'lucide-react';

export default function CampaignTable({ campaigns, onTriggerCampaign }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Campaign Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Subject Headline</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Recipient Reach</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>CTR Response</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(cam => (
            <tr key={cam.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div>
                  <strong style={{ color: '#1f2937' }}>{cam.name}</strong>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>Code: {cam.promoCode}</div>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{cam.subject}</td>
              <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1f2937' }}>{cam.recipients.toLocaleString()} merchants</td>
              <td style={{ padding: '14px 16px', color: '#7c3aed', fontWeight: 700 }}>{cam.ctr}%</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: cam.status === 'Sent' ? '#d1fae5' : '#f3f4f6',
                  color: cam.status === 'Sent' ? '#065f46' : '#6b7280'
                }}>
                  {cam.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onTriggerCampaign(cam.id, cam.name)}
                  disabled={cam.status === 'Sent'}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e5e7eb', backgroundColor: cam.status === 'Sent' ? '#f9fafb' : '#fff', color: cam.status === 'Sent' ? '#9ca3af' : '#7c3aed', padding: '6px 12px', borderRadius: '6px', cursor: cam.status === 'Sent' ? 'default' : 'pointer', fontSize: '11.5px', fontWeight: 600 }}
                >
                  <Send size={12} /> Dispatch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
