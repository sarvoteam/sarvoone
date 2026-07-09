import React, { useState } from 'react';
import TicketList from '../components/TicketList';
import TicketDetail from '../components/TicketDetail';

const initialTickets = [
  { id: 'TKT-1081', business: 'Sarvo Medical & General Store', owner: 'Emily Lynch', email: 'emily.lynch@gmail.com', category: 'Hardware Bug', subject: 'Thermal barcode prints overflowing label borders', priority: 'High', description: 'When printing item barcodes on our standard 50x30mm thermal rolls, the barcode is offset to the right and cuts off. Please help adjust margin settings.', date: '2026-07-09', status: 'Open' },
  { id: 'TKT-1080', business: 'Vogue Boutique Apparel', owner: 'Alexander Medvedev', email: 'alex.med@gmail.com', category: 'Billing Query', subject: 'Upgraded to Pro but invoice shows Basic tier pricing', priority: 'Medium', description: 'We upgraded our plan to Pro on 7th July, but the recent automated invoice shows the Basic plan pricing. Please check payment status.', date: '2026-07-08', status: 'Open' },
  { id: 'TKT-1079', business: 'TechHub Devices & Wholesalers', owner: 'Marques Brownley', email: 'mkbhd@gmail.com', category: 'Feature Request', subject: 'Bulk import of products via Excel XLSX format', priority: 'Low', description: 'We have over 5000 SKUs and the CSV uploader sometimes errors out on special characters. Can we have direct Excel (.xlsx) support?', date: '2026-07-07', status: 'Resolved' },
  { id: 'TKT-1078', business: 'Anastasia Grocery Outlet', owner: 'Anastasia Golovko', email: 'anastasia@outlook.com', category: 'Technical Bug', subject: 'POS offline mode database sync issue', priority: 'High', description: 'After working in offline mode during yesterday\'s internet blackout, 3 sales tickets did not sync correctly to the cloud dashboard when connection was restored.', date: '2026-07-06', status: 'Open' }
];

export default function SupportTickets() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleResolve = (id) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        alert(`Ticket ${t.id} has been marked as Resolved.`);
        return { ...t, status: 'Resolved' };
      }
      return t;
    }));
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'Resolved' } : null);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    alert(`Response sent to ${selectedTicket.owner} (${selectedTicket.business}): "${replyText}"`);
    handleResolve(selectedTicket.id);
    setReplyText('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', display: 'grid', gridTemplateColumns: selectedTicket ? '1fr 1fr' : '1fr', gap: '20px' }}>
      <div>
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Platform Helpdesk Support</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Respond to support requests, review bug reports, and manage customer tickets.</p>
        </div>

        <TicketList 
          tickets={tickets} 
          selectedTicket={selectedTicket} 
          onSelect={setSelectedTicket} 
        />
      </div>

      {selectedTicket && (
        <TicketDetail 
          selectedTicket={selectedTicket}
          replyText={replyText}
          setReplyText={setReplyText}
          onSendReply={handleSendReply}
          onResolve={handleResolve}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
