import React, { useState } from 'react';
import { Search, Plus, Printer, FileText } from 'lucide-react';

const initialInvoices = [
  { id: 1, invNo: 'INV-2026-009', customer: 'Emily Lynch', date: '2026-07-02', type: 'Cash Sale', amount: 1250, status: 'Paid' },
  { id: 2, invNo: 'INV-2026-007', customer: 'Alexander Medvedev', date: '2026-07-02', type: 'Credit Sale', amount: 1250, status: 'Paid' },
  { id: 3, invNo: 'INV-2026-008', customer: 'Faizur Rehman', date: '2026-07-04', type: 'Credit Sale', amount: 5400, status: 'Pending' }
];

export default function SalesManagement() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState('');
  const [viewType, setViewType] = useState('Invoices'); // 'Invoices' / 'Quotations' / 'Challans'

  const filtered = invoices.filter(i => 
    i.customer.toLowerCase().includes(search.toLowerCase()) || 
    i.invNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Sales Billing Records</h2>
          <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f3f4f6', borderRadius: '6px', padding: '2px' }}>
            {['Invoices', 'Quotations', 'Challans'].map(t => (
              <button 
                key={t}
                onClick={() => setViewType(t)}
                style={{ 
                  border: 'none', 
                  backgroundColor: viewType === t ? '#fff' : 'transparent', 
                  padding: '6px 12px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: viewType === t ? '#7c3aed' : '#6b7280',
                  cursor: 'pointer' 
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder={`Search ${viewType.toLowerCase()}...`} 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '200px', outline: 'none' }}
            />
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Create {viewType.slice(0, -1)}
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Document ID</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Issue Date</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Type</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Invoice Total</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(i => (
              <tr key={i.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#111827' }}>
                  {viewType === 'Invoices' ? i.invNo : viewType === 'Quotations' ? i.invNo.replace('INV', 'QTN') : i.invNo.replace('INV', 'CHL')}
                </td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{i.customer}</td>
                <td style={{ padding: '12px' }}>{i.date}</td>
                <td style={{ padding: '12px' }}>{i.type}</td>
                <td style={{ padding: '12px', fontWeight: 700, color: '#7c3aed' }}>₹{i.amount.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    backgroundColor: i.status === 'Paid' ? '#d1fae5' : '#fef3c7',
                    color: i.status === 'Paid' ? '#065f46' : '#92400e'
                  }}>
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
