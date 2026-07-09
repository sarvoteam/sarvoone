import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit, Building2, Star, CheckCircle, Clock } from 'lucide-react';

const initialSuppliers = [
  { id: 1, name: 'Astra Distributors', contact: 'Roy Astra', phone: '9876543220', email: 'orders@astradist.com', address: 'BKC Phase 1, Mumbai', gstin: '27DDDDD4444D4Z4', dues: 28000, bankDetails: 'HDFC - 5020001234 - HDFC0000123', rating: 4.8 },
  { id: 2, name: 'MedLife Wholesalers', contact: 'Dr. Sarah Lee', phone: '9922883311', email: 'sales@medlife.com', address: 'Kothrud Industrial, Pune', gstin: '27EEEEE5555E5Z5', dues: 0, bankDetails: 'ICICI - 0012050012 - ICIC0000012', rating: 4.2 },
  { id: 3, name: 'Apex Electronics Corp', contact: 'Tony Stark', phone: '9822001155', email: 'info@apexelectronics.com', address: 'Connaught Place Area, Delhi', gstin: '27FFFFF6666F6Z6', dues: 15400, bankDetails: 'SBI - 1002003004 - SBIN0000201', rating: 5.0 }
];

const mockPurchaseHistory = [
  { poNo: 'PO-2026-001', date: '2026-07-02', amount: 50000, status: 'Received', paid: true },
  { poNo: 'PO-2026-002', date: '2026-07-05', amount: 15400, status: 'Ordered', paid: false }
];

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState('');
  const [selectedSupp, setSelectedSupp] = useState(initialSuppliers[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formGstin, setFormGstin] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formBank, setFormBank] = useState('');
  const [formDues, setFormDues] = useState(0);
  const [formRating, setFormRating] = useState(4.5);

  const handleDelete = (id) => {
    if (window.confirm('Delete this supplier ledger?')) {
      const updated = suppliers.filter(s => s.id !== id);
      setSuppliers(updated);
      if (selectedSupp && selectedSupp.id === id) {
        setSelectedSupp(updated[0] || null);
      }
    }
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormGstin('');
    setFormContact('');
    setFormAddress('');
    setFormBank('');
    setFormDues(0);
    setFormRating(4.5);
    setIsEditing(false);
    setShowAddModal(true);
  };

  const handleOpenEdit = (supp) => {
    setFormName(supp.name);
    setFormGstin(supp.gstin);
    setFormContact(supp.contact);
    setFormAddress(supp.address);
    setFormBank(supp.bankDetails);
    setFormDues(supp.dues);
    setFormRating(supp.rating);
    setIsEditing(true);
    setSelectedSupp(supp);
    setShowAddModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updated = suppliers.map(s => s.id === selectedSupp.id ? {
        ...s,
        name: formName,
        gstin: formGstin,
        contact: formContact,
        address: formAddress,
        bankDetails: formBank,
        dues: Number(formDues),
        rating: Number(formRating)
      } : s);
      setSuppliers(updated);
      setSelectedSupp(updated.find(s => s.id === selectedSupp.id));
    } else {
      const newSupp = {
        id: Date.now(),
        name: formName,
        gstin: formGstin,
        contact: formContact,
        address: formAddress,
        bankDetails: formBank,
        dues: Number(formDues),
        rating: Number(formRating)
      };
      setSuppliers([...suppliers, newSupp]);
      setSelectedSupp(newSupp);
    }
    setShowAddModal(false);
  };

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Left Panel: Supplier database */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>Supplier Master Directory</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
              <input 
                type="text" 
                placeholder="Search suppliers..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '6px 12px 6px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '180px', outline: 'none' }}
              />
            </div>
            <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
              <Plus size={14} /> Add Supplier
            </button>
          </div>
        </div>

        <div className="dashboard-table-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                <th style={{ padding: '10px', color: '#6b7280' }}>Supplier</th>
                <th style={{ padding: '10px', color: '#6b7280' }}>GSTIN Details</th>
                <th style={{ padding: '10px', color: '#6b7280' }}>Dues Balance</th>
                <th style={{ padding: '10px', color: '#6b7280', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr 
                  key={s.id} 
                  onClick={() => setSelectedSupp(s)}
                  style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', backgroundColor: selectedSupp?.id === s.id ? '#f9fafb' : 'transparent' }}
                >
                  <td style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Contact: {s.contact}</div>
                  </td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>{s.gstin || 'N/A'}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: s.dues > 0 ? '#ef4444' : '#10b981' }}>
                    ₹{s.dues.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleOpenEdit(s)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}><Edit size={14} /></button>
                      <button onClick={() => handleDelete(s.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel: Ledger details */}
      {selectedSupp && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>Ledger: {selectedSupp.name}</h3>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Address: {selectedSupp.address}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f9fafb', padding: '14px', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Bank Accounts</div>
              <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace', color: '#374151' }}>{selectedSupp.bankDetails}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Supplier Rating</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#eab308', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#eab308" /> {selectedSupp.rating} / 5
              </div>
            </div>
          </div>

          {/* Purchase logs */}
          <div>
            <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Purchase & Payment Tracking</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mockPurchaseHistory.map(hist => (
                <div key={hist.poNo} style={{ display: 'flex', justify: 'space-between', border: '1px solid #f3f4f6', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                  <div>
                    <strong>{hist.poNo}</strong>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Date: {hist.date} | Amount: ₹{hist.amount.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      fontSize: '10px', 
                      fontWeight: 700, 
                      backgroundColor: hist.paid ? '#d1fae5' : '#fee2e2',
                      color: hist.paid ? '#065f46' : '#b91c1c'
                    }}>
                      {hist.paid ? 'Paid' : 'Pending Payment'}
                    </span>
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>Delivery: {hist.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Supplier Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 16px', color: '#1f2937' }}>{isEditing ? 'Edit Supplier' : 'Register Supplier Entity'}</h3>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Supplier Name</label>
                <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Contact Person</label>
                  <input type="text" required value={formContact} onChange={(e) => setFormContact(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>GST Number</label>
                  <input type="text" value={formGstin} onChange={(e) => setFormGstin(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Address</label>
                <input type="text" value={formAddress} onChange={(e) => setFormAddress(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Bank Details (e.g. Bank - A/C - IFSC)</label>
                <input type="text" placeholder="HDFC - 50200000000 - HDFC0000001" value={formBank} onChange={(e) => setFormBank(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Dues Balance (₹)</label>
                  <input type="number" value={formDues} onChange={(e) => setFormDues(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Supplier Rating (1-5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={formRating} onChange={(e) => setFormRating(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '8px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Ledger</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
