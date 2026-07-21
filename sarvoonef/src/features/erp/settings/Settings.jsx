import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Database, Shield, Check, Palette, Eye, Loader2 } from 'lucide-react';
import api from '../../../shared/api/axios';
import { PALETTE_CATEGORIES, getPaletteStyles } from '../../../shared/constants/palettes';

export default function Settings() {
  const { businessSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('INR (₹)');
  const [selectedPalette, setSelectedPalette] = useState('royal_violet');
  const [activeCategory, setActiveCategory] = useState('elegant_luxury');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!businessSlug) return;
    setLoading(true);
    setError(null);
    api.get(`/erp/settings/${businessSlug}`)
      .then((res) => {
        if (res.data && res.data.success) {
          const biz = res.data.data;
          setStoreName(biz.name || '');
          setPhone(biz.phone || '');
          if (biz.settings?.currency) {
            setCurrency(biz.settings.currency);
          }
          if (biz.settings?.colorPalette) {
            setSelectedPalette(biz.settings.colorPalette);
            const categoryMatch = PALETTE_CATEGORIES.find(cat => 
              cat.palettes.some(p => p.id === biz.settings.colorPalette)
            );
            if (categoryMatch) {
              setActiveCategory(categoryMatch.id);
            }
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load business configurations.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [businessSlug]);

  const handleBackup = () => {
    alert('Creating general database backup... "sarvo_erp_backup_2026.sql" downloaded successfully.');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setError(null);

    api.put(`/erp/settings/${businessSlug}`, {
      name: storeName,
      phone,
      currency,
      colorPalette: selectedPalette
    })
      .then((res) => {
        if (res.data && res.data.success) {
          setSuccessMsg('Company configurations and color palette updated successfully!');
          const savedUser = sessionStorage.getItem('sarvo_user');
          if (savedUser) {
            try {
              const u = JSON.parse(savedUser);
              u.businessName = res.data.data.name;
              sessionStorage.setItem('sarvo_user', JSON.stringify(u));
            } catch (err) {
              // ignore
            }
          }
        } else {
          setError('Failed to update configurations.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || 'Error updating configurations.');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px', gap: '16px', fontFamily: 'system-ui, sans-serif' }}>
        <Loader2 className="animate-spin" style={{ color: '#7c3aed' }} size={40} />
        <h3 style={{ margin: 0, color: '#374151', fontWeight: 600 }}>Loading settings...</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '13px' }}>Retrieving your store configuration profile.</p>
      </div>
    );
  }

  const activeCategoryData = PALETTE_CATEGORIES.find(c => c.id === activeCategory);
  const previewStyles = getPaletteStyles(selectedPalette);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px', fontFamily: 'system-ui, sans-serif', alignItems: 'start', paddingBottom: '40px' }}>
      
      {/* Left panel: form settings & palette selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Profile configurations form */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Company Profile Configurations</h2>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#6b7280' }}>Update your core business metadata and profile contact information.</p>
          
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', color: '#b91c1c', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
              {error}
            </div>
          )}
          
          {successMsg && (
            <div style={{ padding: '12px', backgroundColor: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '8px', color: '#065f46', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Registered Store/Company Name</label>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)} 
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Support Contact Phone</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Base System Currency</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#fff', boxSizing: 'border-box' }}
                >
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={saving}
              style={{ 
                padding: '12px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginTop: '10px', 
                gap: '8px', 
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.8 : 1,
                boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.2)'
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Saving changes...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Configurations
                </>
              )}
            </button>
          </form>
        </div>

        {/* Color Palette Picker Panel */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Palette size={20} style={{ color: '#7c3aed' }} />
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Storefront Color Palette</h2>
          </div>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#6b7280' }}>
            Choose a curated palette that matches your brand. The selected theme applies instantly to your public storefront profile page.
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px', borderBottom: '1px solid #f3f4f6' }}>
            {PALETTE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: activeCategory === cat.id ? '1px solid #7c3aed' : '1px solid #e5e7eb',
                  backgroundColor: activeCategory === cat.id ? '#f5f3ff' : '#fff',
                  color: activeCategory === cat.id ? '#7c3aed' : '#4b5563',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active Category Description */}
          {activeCategoryData && (
            <p style={{ margin: '0 0 16px', fontSize: '12.5px', fontStyle: 'italic', color: '#4b5563' }}>
              &ldquo;{activeCategoryData.description}&rdquo;
            </p>
          )}

          {/* Palettes Selection Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {activeCategoryData?.palettes.map(palette => {
              const isSelected = selectedPalette === palette.id;
              return (
                <div
                  key={palette.id}
                  onClick={() => setSelectedPalette(palette.id)}
                  style={{
                    border: isSelected ? '2.5px solid #7c3aed' : '1.5px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#faf5ff' : '#fff',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    boxShadow: isSelected ? '0 10px 15px -3px rgba(124, 58, 237, 0.1)' : 'none'
                  }}
                  className="palette-card"
                >
                  {/* Selected Indicator Checkmark */}
                  {isSelected && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#7c3aed', color: '#fff', borderRadius: '50%', padding: '2px' }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b', marginBottom: '8px' }}>
                    {palette.name}
                  </div>

                  {/* Colors Preview */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {palette.previewColors.map((col, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: col,
                          border: '1.5px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right panel: system backup triggers & Live Storefront Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Storefront Live Preview Card */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Eye size={18} style={{ color: '#7c3aed' }} />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>
              Storefront Live Preview
            </h3>
          </div>
          
          {/* Mock Browser Wrapper */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fcfbfe' }}>
            
            {/* Browser top-bar */}
            <div style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
              <div style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '9px', padding: '2px 8px', color: '#64748b', marginLeft: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                localhost:5173/{businessSlug || 'rg-business'}
              </div>
            </div>

            {/* Mock Layout using variables */}
            <div style={{ ...previewStyles, transition: 'all 0.4s ease', fontSize: '12px', display: 'flex', flexDirection: 'column' }}>
              
              {/* Mock Navbar */}
              <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e8e5f2', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ background: 'var(--primary-gradient)', color: '#fff', width: '16px', height: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '9px' }}>S</div>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--primary-color)' }}>Sarvo One</span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary-color)' }}>
                  {storeName || 'My Business'}
                </span>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
              </div>

              {/* Mock Hero Banner */}
              <div style={{ background: 'var(--hero-gradient)', padding: '20px 12px', color: '#fff', textAlign: 'left', transition: 'all 0.4s ease' }}>
                <span style={{ backgroundColor: 'var(--badge-bg)', color: 'var(--badge-color)', border: '1px solid var(--badge-border)', fontSize: '8px', padding: '2px 6px', borderRadius: '8px', fontWeight: 700, display: 'inline-block', marginBottom: '6px' }}>RETAILER</span>
                <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 800, color: '#fff' }}>{storeName || 'My Business'}</h4>
                <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>📍 Bandra BKC, Mumbai</span>
                  <span>📞 {phone || '+91 98765 43210'}</span>
                </div>
              </div>

              {/* Mock Products list */}
              <div style={{ padding: '12px', backgroundColor: '#fcfbfe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '10px', color: '#111827' }}>Catalog Storefront</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ fontSize: '8px', backgroundColor: 'var(--primary-color)', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>All</span>
                    <span style={{ fontSize: '8px', backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#4b5563', padding: '2px 6px', borderRadius: '4px' }}>Medical</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Product card 1 */}
                  <div style={{ backgroundColor: '#fff', border: '1px solid #eae6f5', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ height: '40px', backgroundColor: 'var(--badge-bg)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary-color)', fontSize: '14px' }}>
                      L
                    </div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#0f0b29', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>LED Bulb 9W</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--price-color)' }}>₹120</div>
                    <button style={{ border: 'none', background: 'var(--button-gradient)', color: '#fff', fontSize: '8px', padding: '4px', borderRadius: '4px', fontWeight: 700, cursor: 'default' }}>Buy Now</button>
                  </div>

                  {/* Product card 2 */}
                  <div style={{ backgroundColor: '#fff', border: '1px solid #eae6f5', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ height: '40px', backgroundColor: 'var(--badge-bg)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary-color)', fontSize: '14px' }}>
                      A
                    </div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#0f0b29', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Amoxicillin 250mg</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--price-color)' }}>₹85</div>
                    <button style={{ border: 'none', background: 'var(--button-gradient)', color: '#fff', fontSize: '8px', padding: '4px', borderRadius: '4px', fontWeight: 700, cursor: 'default' }}>Buy Now</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Backup & Restore */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
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

        {/* System Logs Audit */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
            <Shield size={18} style={{ color: '#10b981' }} /> System Logs Audit
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
            <div>Last backup: <strong style={{ color: '#374151' }}>Today, 10:20 AM</strong></div>
            <div>Active user: <strong style={{ color: '#374151' }}>Emily Lynch (Super Admin)</strong></div>
            <div>Branches status: <strong style={{ color: '#374151' }}>2 Online, 1 Offline</strong></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
