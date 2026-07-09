import React from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function TicketDetail({ selectedTicket, replyText, setReplyText, onSendReply, onResolve, onClose }) {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed' }}>{selectedTicket.id} / {selectedTicket.category}</span>
          <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>{selectedTicket.subject}</h3>
        </div>
        <button 
          onClick={onClose} 
          style={{ border: 'none', background: 'none', fontSize: '13px', color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}
        >
          Close [X]
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', fontSize: '12.5px', color: '#4b5563', marginBottom: '16px' }}>
          <strong>From:</strong> 
          <span>{selectedTicket.owner} ({selectedTicket.email}) - {selectedTicket.business}</span>
        </div>

        <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '16px', fontSize: '13px', color: '#4b5563', lineHeight: '145%', marginBottom: '20px', border: '1px solid #f3f4f6' }}>
          {selectedTicket.description}
        </div>

        {selectedTicket.status === 'Open' ? (
          <form onSubmit={onSendReply}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              Compose Reply to Store Owner
            </label>
            <textarea 
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your troubleshooting advice or billing resolution details here..."
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '13px', fontFamily: 'inherit', resize: 'none', marginBottom: '14px' }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                <Send size={14} /> Send Reply & Resolve
              </button>
              
              <button 
                type="button"
                onClick={() => onResolve(selectedTicket.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e5e7eb', color: '#4b5563', backgroundColor: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                <CheckCircle size={14} /> Resolve Only
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '8px', color: '#065f46', fontSize: '13px', fontWeight: 600 }}>
            <CheckCircle size={16} /> This ticket was marked as resolved.
          </div>
        )}
      </div>
    </div>
  );
}
