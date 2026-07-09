import React, { useState } from 'react';
import { Bell, ShieldAlert, Mail, MessageSquare } from 'lucide-react';

export default function Notifications() {
  const [stockThreshold, setStockThreshold] = useState(10);
  const [expiryDays, setExpiryDays] = useState(30);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Notification parameters saved successfully!');
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px' }}>
      <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '14px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Notification Threshold Configurations</h2>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>Configure limits for low stock warnings and product expiration updates.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
            Low Stock Warning Threshold (units)
          </label>
          <input 
            type="number" 
            value={stockThreshold} 
            onChange={(e) => setStockThreshold(Number(e.target.value))} 
            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>
            Product Expiry Alert Lead Time (days)
          </label>
          <input 
            type="number" 
            value={expiryDays} 
            onChange={(e) => setExpiryDays(Number(e.target.value))} 
            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Notification Channels</span>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
            <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
            <Mail size={16} style={{ color: '#6b7280' }} />
            <span>Send Email Updates to Administrator</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
            <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} />
            <MessageSquare size={16} style={{ color: '#6b7280' }} />
            <span>Send Daily Summary SMS to (+91) 98765 43210</span>
          </label>
        </div>

        <button type="submit" className="btn-primary" style={{ padding: '12px', display: 'flex', justify: 'center', align: 'center', width: '100%', marginTop: '10px' }}>
          Save Configuration
        </button>
      </form>
    </div>
  );
}
