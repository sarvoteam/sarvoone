import React from 'react';
import { Loader2, AlertCircle, ShoppingCart } from 'lucide-react';

export default function PurchaseTable({ purchases, loading, error, onReload }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#6b7280', minHeight: '300px' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Loading purchase logs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#dc2626', padding: '20px', textAlign: 'center', minHeight: '300px' }}>
        <AlertCircle size={32} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>{error}</span>
        <button onClick={onReload} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', marginTop: '10px' }}>Try Again</button>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#9ca3af', padding: '20px', textAlign: 'center', minHeight: '300px' }}>
        <ShoppingCart size={32} style={{ marginBottom: '10px', color: '#cbd5e1' }} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>No purchase orders recorded.</span>
        <span style={{ fontSize: '11.5px', marginTop: '2px' }}>Click "Create Purchase Order" to register your first procurement sheet.</span>
      </div>
    );
  }

  return (
    <div className="dashboard-table-wrapper" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(124, 58, 237, 0.15)' }}>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>PO Number</th>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supplier</th>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Items Count</th>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Value</th>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Status</th>
            <th style={{ padding: '14px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(p => {
            const itemsCount = p.items?.length || 0;
            const formattedDate = p.createdAt ? new Date(p.createdAt).toISOString().slice(0, 10) : 'N/A';
            const payStatus = p.status === 'Received' ? 'Paid' : 'Pending';
            
            return (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.06)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>{p.orderNumber}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{p.supplier?.name || 'Unknown'}</span>
                </td>
                <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 500 }}>
                  {formattedDate}
                </td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>
                  {itemsCount} products
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                  ₹{p.totalAmount ? p.totalAmount.toFixed(2) : '0.00'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '12px', 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    backgroundColor: p.status === 'Received' ? '#d1fae5' : '#f3e8ff',
                    color: p.status === 'Received' ? '#065f46' : '#7c3aed',
                    display: 'inline-block'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '12px', 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    backgroundColor: payStatus === 'Paid' ? '#d1fae5' : '#fffbeb',
                    color: payStatus === 'Paid' ? '#065f46' : '#b45309',
                    display: 'inline-block'
                  }}>
                    {payStatus}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
