import React, { useState } from 'react';
import { Search, Plus, Eye, ShoppingCart } from 'lucide-react';

const initialPurchases = [
  { id: 1, poNo: 'PO-2026-001', supplier: 'Astra Distributors', date: '2026-07-03', amount: 2800, items: 3, status: 'Received', paymentStatus: 'Paid' },
  { id: 2, poNo: 'PO-2026-002', supplier: 'Apex Electronics Corp', date: '2026-07-06', amount: 1540, items: 1, status: 'Ordered', paymentStatus: 'Pending' },
  { id: 3, poNo: 'PO-2026-003', supplier: 'MedLife Wholesalers', date: '2026-07-07', amount: 5400, items: 12, status: 'Received', paymentStatus: 'Paid' }
];

export default function PurchaseManagement() {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [search, setSearch] = useState('');

  const filtered = purchases.filter(p => 
    p.supplier.toLowerCase().includes(search.toLowerCase()) || 
    p.poNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Purchase Orders & Invoices</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search purchases..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '200px', outline: 'none' }}
            />
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Create Purchase Order
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>PO Number</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Supplier</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Date</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Items Count</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Total Value</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Delivery Status</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#111827' }}>{p.poNo}</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{p.supplier}</td>
                <td style={{ padding: '12px' }}>{p.date}</td>
                <td style={{ padding: '12px' }}>{p.items} products</td>
                <td style={{ padding: '12px', fontWeight: 700 }}>₹{p.amount.toFixed(2)}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    backgroundColor: p.status === 'Received' ? '#d1fae5' : '#eff6ff',
                    color: p.status === 'Received' ? '#065f46' : '#1d4ed8'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    backgroundColor: p.paymentStatus === 'Paid' ? '#d1fae5' : '#fee2e2',
                    color: p.paymentStatus === 'Paid' ? '#065f46' : '#b91c1c'
                  }}>
                    {p.paymentStatus}
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
