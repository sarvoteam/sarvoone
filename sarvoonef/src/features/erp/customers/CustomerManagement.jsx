import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit, FileText, CheckCircle, Clock } from 'lucide-react';

const initialCustomers = [
  { id: 1, name: 'Alexander Medvedev', email: 'alex.med@gmail.com', phone: '9876543210', address: 'Bandra BKC, Mumbai', gstin: '27AAAAA1111A1Z1', creditLimit: 50000, balance: 30000, loyaltyPoints: 450 },
  { id: 2, name: 'Marques Brownley', email: 'mkbhd@gmail.com', phone: '9922883344', address: 'Kothrud Main Road, Pune', gstin: '27BBBBB2222B2Z2', creditLimit: 100000, balance: 0, loyaltyPoints: 120 },
  { id: 3, name: 'Anastasia Golovko', email: 'anastasia@outlook.com', phone: '9822001144', address: 'CP Block B, New Delhi', gstin: '', creditLimit: 20000, balance: 5000, loyaltyPoints: 320 }
];

const mockSalesHistory = [
  { invNo: 'INV-2026-001', date: '2026-07-02', total: 50000, paid: 20000, outstanding: 30000 },
  { invNo: 'INV-2026-002', date: '2026-07-05', total: 15000, paid: 10000, outstanding: 5000 }
];

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState(initialCustomers[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formGstin, setFormGstin] = useState('');
  const [formLimit, setFormLimit] = useState(50000);
  const [formBuyVal, setFormBuyVal] = useState(50000);
  const [formPaidVal, setFormPaidVal] = useState(20000);

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer ledger?')) {
      const updated = customers.filter(c => c.id !== id);
      setCustomers(updated);
      if (selectedCust && selectedCust.id === id) {
        setSelectedCust(updated[0] || null);
      }
    }
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormAddress('');
    setFormGstin('');
    setFormLimit(50000);
    setFormBuyVal(50000);
    setFormPaidVal(20000);
    setIsEditing(false);
    setShowAddModal(true);
  };

  const handleOpenEdit = (cust) => {
    setFormName(cust.name);
    setFormPhone(cust.phone);
    setFormEmail(cust.email);
    setFormAddress(cust.address);
    setFormGstin(cust.gstin);
    setFormLimit(cust.creditLimit);
    setFormBuyVal(50000);
    setFormPaidVal(20000);
    setIsEditing(true);
    setSelectedCust(cust);
    setShowAddModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const outstanding = formBuyVal - formPaidVal; // Automatic outstanding calculation as requested in example!
    
    if (isEditing) {
      const updated = customers.map(c => c.id === selectedCust.id ? {
        ...c,
        name: formName,
        phone: formPhone,
        email: formEmail,
        address: formAddress,
        gstin: formGstin,
        creditLimit: Number(formLimit),
        balance: outstanding,
        loyaltyPoints: Math.floor(formPaidVal * 0.01) // 1 point per 100 paid
      } : c);
      setCustomers(updated);
      setSelectedCust(updated.find(c => c.id === selectedCust.id));
    } else {
      const newCust = {
        id: Date.now(),
        name: formName,
        phone: formPhone,
        email: formEmail,
        address: formAddress,
        gstin: formGstin,
        creditLimit: Number(formLimit),
        balance: outstanding,
        loyaltyPoints: Math.floor(formPaidVal * 0.01)
      };
      setCustomers([...customers, newCust]);
      setSelectedCust(newCust);
    }
    setShowAddModal(false);
  };

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Left panel: Customers list */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>Customers Directory</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
              <input 
                type="text" 
                placeholder="Search phone or name..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '6px 12px 6px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '180px', outline: 'none' }}
              />
            </div>
            <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
              <Plus size={14} /> Add Customer
            </button>
          </div>
        </div>

        <div className="dashboard-table-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                <th style={{ padding: '10px', color: '#6b7280' }}>Customer</th>
                <th style={{ padding: '10px', color: '#6b7280' }}>GSTIN Details</th>
                <th style={{ padding: '10px', color: '#6b7280' }}>Outstanding Dues</th>
                <th style={{ padding: '10px', color: '#6b7280', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr 
                  key={c.id} 
                  onClick={() => setSelectedCust(c)}
                  style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', backgroundColor: selectedCust?.id === c.id ? '#f9fafb' : 'transparent' }}
                >
                  <td style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.phone}</div>
                  </td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>{c.gstin || 'N/A'}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: c.balance > 0 ? '#ef4444' : '#10b981' }}>
                    ₹{c.balance.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleOpenEdit(c)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}><Edit size={14} /></button>
                      <button onClick={() => handleDelete(c.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right panel: Ledger Details */}
      {selectedCust && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>Ledger: {selectedCust.name}</h3>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Address: {selectedCust.address}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f9fafb', padding: '14px', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Credit Limit</div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>₹{selectedCust.creditLimit.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Loyalty Points</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#7c3aed' }}>🌟 {selectedCust.loyaltyPoints} pts</div>
            </div>
          </div>

          {/* Sales History Log */}
          <div>
            <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#374151' }}>Sales & Outstanding History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mockSalesHistory.map(hist => (
                <div key={hist.invNo} style={{ display: 'flex', justify: 'space-between', border: '1px solid #f3f4f6', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                  <div>
                    <strong>{hist.invNo}</strong>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Date: {hist.date} | Total: ₹{hist.total.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#10b981', fontWeight: 600 }}>Paid: ₹{hist.paid.toLocaleString()}</div>
                    <div style={{ color: '#ef4444', fontWeight: 700 }}>Due: ₹{hist.outstanding.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Customer Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 16px', color: '#1f2937' }}>{isEditing ? 'Edit Customer Info' : 'Register New Customer'}</h3>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Customer Name</label>
                <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Mobile Number</label>
                  <input type="text" required value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Email</label>
                  <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Address</label>
                <input type="text" value={formAddress} onChange={(e) => setFormAddress(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>GST Number</label>
                  <input type="text" value={formGstin} onChange={(e) => setFormGstin(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Credit Limit (₹)</label>
                  <input type="number" value={formLimit} onChange={(e) => setFormLimit(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>

              {/* Automatic outstanding calculator demonstration block */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', marginTop: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', display: 'block', marginBottom: '6px' }}>Ledger Calculation Simulation (₹)</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', color: '#6b7280' }}>Goods Purchased Value</label>
                    <input type="number" value={formBuyVal} onChange={(e) => setFormBuyVal(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '11px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', color: '#6b7280' }}>Amount Paid Now</label>
                    <input type="number" value={formPaidVal} onChange={(e) => setFormPaidVal(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '11px' }} />
                  </div>
                </div>
                <div style={{ fontSize: '11px', marginTop: '8px', fontWeight: 600, color: '#ef4444' }}>
                  Auto Calculated Outstanding: ₹{(formBuyVal - formPaidVal).toLocaleString()}
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
