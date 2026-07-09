import React, { useState } from 'react';
import { Megaphone } from 'lucide-react';

export default function AnnouncementForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [urgency, setUrgency] = useState('Promo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    alert(`Announcement banner published: [${urgency}] "${title}"`);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#374151', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>Publish System Bulletin Board Alert</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Bulletin Urgency Level</label>
        <select 
          value={urgency} 
          onChange={(e) => setUrgency(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        >
          <option value="Promo">Promotion / Feature Spotlight</option>
          <option value="Info">General Maintenance Information</option>
          <option value="Critical">Downtime Alert / High Priority</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Bulletin Heading Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="e.g. Server Maintenance: 12th July, 02:00 - 04:00 AM IST"
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Announcement Detailed Body</label>
        <textarea 
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type the notification description detail. Use this to notify merchants of upgrades, scheduled outages, or promotions."
          style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
        />
      </div>

      <button 
        type="submit" 
        style={{ display: 'flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}
      >
        <Megaphone size={14} /> Publish Bulletin
      </button>
    </form>
  );
}
