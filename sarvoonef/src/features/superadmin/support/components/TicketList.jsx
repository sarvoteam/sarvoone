import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function TicketList({ tickets, selectedTicket, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tickets.map(t => (
        <div 
          key={t.id} 
          onClick={() => onSelect(t)}
          style={{ 
            backgroundColor: '#fff', 
            borderRadius: '10px', 
            border: selectedTicket && selectedTicket.id === t.id ? '2px solid #7c3aed' : '1px solid #e5e7eb', 
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: selectedTicket && selectedTicket.id === t.id ? '0 4px 6px -1px rgba(124, 58, 237, 0.08)' : 'none'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280' }}>{t.id} • {t.category}</span>
            <span style={{ 
              padding: '2px 8px', 
              borderRadius: '4px', 
              fontSize: '10px', 
              fontWeight: 700, 
              backgroundColor: t.status === 'Resolved' ? '#d1fae5' : '#fef3c7',
              color: t.status === 'Resolved' ? '#065f46' : '#b45309'
            }}>
              {t.status}
            </span>
          </div>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '13.5px', fontWeight: 600, color: '#1f2937' }}>{t.subject}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#6b7280' }}>
            <span>{t.business} ({t.owner})</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                color: t.priority === 'High' ? '#ef4444' : t.priority === 'Medium' ? '#f59e0b' : '#3b82f6',
                fontWeight: 600
              }}>
                <AlertCircle size={10} /> {t.priority}
              </span>
              <span>{t.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
