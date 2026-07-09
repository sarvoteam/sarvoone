import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function InvoiceList({ invoices, onDownload }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Invoice Number</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Business</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Billing Date</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Amount Due</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} style={{ color: '#9ca3af' }} />
                  <span style={{ fontWeight: 600, color: '#4b5563' }}>{inv.invoiceNo}</span>
                </div>
              </td>
              <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1f2937' }}>{inv.business}</td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{inv.date}</td>
              <td style={{ padding: '14px 16px', fontWeight: 700 }}>₹{inv.amount.toLocaleString()}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: inv.status === 'Paid' ? '#d1fae5' : '#fef3c7',
                  color: inv.status === 'Paid' ? '#065f46' : '#b45309'
                }}>
                  {inv.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button 
                  onClick={() => onDownload(inv.invoiceNo)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#4b5563', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 600 }}
                >
                  <Download size={12} /> Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
