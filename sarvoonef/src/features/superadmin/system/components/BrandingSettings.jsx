import React, { useState } from 'react';

export default function BrandingSettings() {
  const [platformName, setPlatformName] = useState('Sarvo One');
  const [domain, setDomain] = useState('app.sarvoone.com');
  const [supportEmail, setSupportEmail] = useState('sarvooneteam@gmail.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('System settings updated successfully.');
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#374151', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>Platform Branding Configuration</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Platform Name</label>
        <input 
          type="text" 
          value={platformName} 
          onChange={(e) => setPlatformName(e.target.value)} 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Custom Platform Domain</label>
        <input 
          type="text" 
          value={domain} 
          onChange={(e) => setDomain(e.target.value)} 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Global Support Email</label>
        <input 
          type="email" 
          value={supportEmail} 
          onChange={(e) => setSupportEmail(e.target.value)} 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
        />
      </div>

      <button 
        type="submit" 
        style={{ alignSelf: 'flex-start', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}
      >
        Save Settings
      </button>
    </form>
  );
}
