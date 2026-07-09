import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function NotificationForm() {
  const [target, setTarget] = useState('All');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('Banner');

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert(`Broadcast dispatched: Type [${type}] to [${target}] target group. Message: "${message}"`);
    setMessage('');
  };

  return (
    <form onSubmit={handleBroadcast} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#374151', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>Compose Global Notification</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Broadcast Message Channel</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        >
          <option value="Banner">Dashboard Announcement Banner</option>
          <option value="Push">Push Notification Alert</option>
          <option value="Email">Global Service Email Blast</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Target Merchant Groups</label>
        <select 
          value={target} 
          onChange={(e) => setTarget(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        >
          <option value="All">All Registered Storefronts</option>
          <option value="Pro">Pro Plan Subscribers Only</option>
          <option value="Enterprise">Enterprise Plan Clients Only</option>
          <option value="Trial">Free Trial Users Only</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Message Text</label>
        <textarea 
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter system announcement text here (markdown supported)..."
          style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
        />
      </div>

      <button 
        type="submit" 
        style={{ display: 'flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}
      >
        <Send size={14} /> Dispatch Broadcast
      </button>
    </form>
  );
}
