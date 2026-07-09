import React, { useState } from 'react';
import ChatConsole from '../components/ChatConsole';

const initialChats = [
  {
    id: 1,
    businessName: 'Sarvo Medical cp',
    owner: 'Emily Lynch',
    lastMsg: 'Can you verify my payment?',
    messages: [
      { sender: 'Client', text: 'Hello, we just upgraded to Pro plan via UPI.' },
      { sender: 'Agent', text: 'Hi Emily! Let me check the ledger for you.' },
      { sender: 'Client', text: 'Thank you. Can you verify my payment?' }
    ]
  },
  {
    id: 2,
    businessName: 'Vogue Boutique Apparel',
    owner: 'Alexander Medvedev',
    lastMsg: 'How do I add a new branch?',
    messages: [
      { sender: 'Client', text: 'Hey support. How do I add a new branch?' }
    ]
  }
];

export default function SupportLiveChat() {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);

  const handleSendMessage = (text) => {
    if (!activeChat) return;
    const updatedMsgs = [...activeChat.messages, { sender: 'Agent', text }];
    const updatedChat = { ...activeChat, messages: updatedMsgs, lastMsg: text };
    
    setChats(chats.map(c => c.id === activeChat.id ? updatedChat : c));
    setActiveChat(updatedChat);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Live Helpdesk Chat</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Engage with active business admins and answer questions in real-time.</p>
      </div>

      <ChatConsole 
        chats={chats} 
        activeChat={activeChat} 
        onSelectChat={setActiveChat} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
}
