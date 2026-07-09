import React, { useState } from 'react';
import { ArrowRightLeft, Plus, CheckCircle, Clock } from 'lucide-react';

const initialTransfers = [
  { id: 1, transNo: 'TR-1002', source: 'Central Warehouse', dest: 'City Branch', date: '2026-07-04', itemsCount: 45, status: 'Completed' },
  { id: 2, transNo: 'TR-1003', source: 'Central Warehouse', dest: 'Medical Store Wing', date: '2026-07-07', itemsCount: 15, status: 'Pending Approval' }
];

export default function StockTransfer() {
  const [transfers, setTransfers] = useState(initialTransfers);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Inter-Branch Stock Transfers</h2>
        <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          <Plus size={16} /> New Transfer Request
        </button>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Transfer ID</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Source Depot</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Destination Depot</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Transfer Date</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Quantity</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Transfer Status</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowRightLeft size={14} style={{ color: '#6b7280' }} /> {t.transNo}
                </td>
                <td style={{ padding: '12px' }}>{t.source}</td>
                <td style={{ padding: '12px' }}>{t.dest}</td>
                <td style={{ padding: '12px' }}>{t.date}</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{t.itemsCount} units</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    backgroundColor: t.status === 'Completed' ? '#d1fae5' : '#fef3c7',
                    color: t.status === 'Completed' ? '#065f46' : '#b45309',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {t.status === 'Completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                    {t.status}
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
