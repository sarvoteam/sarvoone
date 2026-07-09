import React, { useState } from 'react';
import { Send, User, CheckCircle } from 'lucide-react';

export default function ChatConsole({ chats, activeChat, onSelectChat, onSendMessage }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', height: '560px' }}>
      
      {/* Chats Sidebar */}
      <div style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '14px', borderBottom: '1px solid #e5e7eb', fontWeight: 700, color: '#374151', fontSize: '13.5px' }}>
          Active Conversations
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => onSelectChat(chat)}
              style={{
                padding: '12px 14px',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                backgroundColor: activeChat?.id === chat.id ? '#f5f3ff' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.businessName}</div>
                <div style={{ fontSize: '11px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.lastMsg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      {activeChat ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '14px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>{activeChat.businessName}</h4>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>● Online ({activeChat.owner})</span>
            </div>
            <button 
              onClick={() => alert('Chat resolved & closed.')}
              style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', borderRadius: '6px', fontSize: '11.5px', color: '#4b5563', padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}
            >
              Close Session
            </button>
          </div>

          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fafafa' }}>
            {activeChat.messages.map((m, idx) => {
              const isAgent = m.sender === 'Agent';
              return (
                <div 
                  key={idx} 
                  style={{
                    alignSelf: isAgent ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    backgroundColor: isAgent ? '#7c3aed' : '#e5e7eb',
                    color: isAgent ? '#fff' : '#1f2937',
                    padding: '10px 14px',
                    borderRadius: isAgent ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    fontSize: '12.5px',
                    lineHeight: '140%'
                  }}
                >
                  {m.text}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '14px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Type your response..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '13px' }}
            />
            <button 
              type="submit"
              style={{ backgroundColor: '#7c3aed', border: 'none', color: '#fff', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}
            >
              <Send size={14} /> Send
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', gap: '8px' }}>
          <User size={48} style={{ strokeWidth: 1 }} />
          <span style={{ fontSize: '13px' }}>Select an active conversation to begin live chat support</span>
        </div>
      )}

    </div>
  );
}
