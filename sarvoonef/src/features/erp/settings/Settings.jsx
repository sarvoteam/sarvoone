import React, { useState } from 'react';
import { Save, Database, Shield } from 'lucide-react';

export default function Settings() {
  const [storeName, setStoreName] = useState('Sarvo General & Medical Store');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [currency, setCurrency] = useState('INR (₹)');

  const handleBackup = () => {
    alert('Creating general database backup... "sarvo_erp_backup_2026.sql" downloaded successfully.');
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Company configurations updated successfully!');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', fontFamily: 'system-ui, sans-serif', alignItems: 'start' }}>
      {/* Left panel: form settings */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Company Profile Configurations</h2>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Registered Store/Company Name</label>
            <input 
              type="text" 
              value={storeName} 
              onChange={(e) => setStoreName(e.target.value)} 
              style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Support Contact Phone</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Base System Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#fff' }}
              >
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '12px', display: 'flex', justify: 'center', align: 'center', marginTop: '10px', gap: '8px' }}>
            <Save size={16} /> Save Changes
          </button>
        </form>
      </div>

      {/* Right panel: system backup triggers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
            <Database size={18} style={{ color: '#7c3aed' }} /> Backup & Restore
          </h3>
          <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '140%', margin: '0 0 16px' }}>
            Securely back up your SQL ledger, customer logs, and stock counts. Backups can be restored at any time.
          </p>
          <button 
            onClick={handleBackup}
            style={{ width: '100%', padding: '10px', border: '1px solid #7c3aed', color: '#7c3aed', backgroundColor: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
          >
            Download SQL Backup
          </button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
            <Shield size={18} style={{ color: '#10b981' }} /> System Logs Audit
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
            <div>Last backup: **Today, 10:20 AM**</div>
            <div>Active user: **Emily Lynch (Super Admin)**</div>
            <div>Branches status: **2 Online, 1 Offline**</div>
          </div>
        </div>
      </div>
    </div>
  );
}
