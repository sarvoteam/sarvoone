import React from 'react';

export default function PaymentHistoryTable({ transactions }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Transaction ID</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Business Storefront</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Billing Package</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Amount Paid</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Payment Date</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Gateway</th>
            <th style={{ padding: '12px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#4b5563' }}>{t.id}</td>
              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1f2937' }}>{t.business}</td>
              <td style={{ padding: '12px 16px', color: '#4b5563' }}>{t.plan}</td>
              <td style={{ padding: '12px 16px', fontWeight: 700 }}>₹{t.amount.toLocaleString()}</td>
              <td style={{ padding: '12px 16px', color: '#6b7280' }}>{t.date}</td>
              <td style={{ padding: '12px 16px', color: '#6b7280' }}>{t.method}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: t.status === 'Success' ? '#d1fae5' : '#fee2e2',
                  color: t.status === 'Success' ? '#065f46' : '#b91c1c'
                }}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
