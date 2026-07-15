import React from 'react';
import { Printer, CheckCircle, X } from 'lucide-react';

export default function POSReceiptModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    alert(`Receipt print command sent to thermal printer for order ${order.orderNo || order.orderNumber}!`);
    onClose();
  };

  const orderNo = order.orderNo || order.orderNumber || 'POS-UNKNOWN';
  const paymentMethod = order.paymentMethod || order.orderType || 'CASH';
  const displayDate = order.date || (order.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString());

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          animation: 'modalSlideUp 0.3s ease-out'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            background: '#f8fafc',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: '6px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ color: '#10b981', marginBottom: '8px' }}>
            <CheckCircle size={44} />
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Payment Successful!
          </h3>
        </div>

        {/* Virtual Thermal Receipt */}
        <div
          style={{
            border: '1px dashed #cbd5e1',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '12px',
            color: '#334155',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.01)'
          }}
        >
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginBottom: '4px', letterSpacing: '1px' }}>
            SARVO ONE ERP
          </div>
          <div style={{ textAlign: 'center', marginBottom: '12px', color: '#64748b' }}>
            Central Depot Branch
          </div>

          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>ORDER:</span>
              <span style={{ fontWeight: 'bold' }}>{orderNo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>DATE:</span>
              <span>{displayDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>METHOD:</span>
              <span style={{ textTransform: 'uppercase' }}>{paymentMethod}</span>
            </div>
          </div>

          {/* List items */}
          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', marginBottom: '8px' }}>
            {order.items && order.items.map((item, idx) => {
              const name = item.product?.name || item.name || 'Product';
              const qty = item.qty || item.quantity || 1;
              const price = item.price || item.sellingPrice || 0;
              return (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ flex: 1, paddingRight: '8px' }}>{name} x {qty}</span>
                  <span>₹{(price * qty).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          {/* Calculations */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Subtotal:</span>
              <span>₹{Number(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>GST (18%):</span>
              <span>₹{Number(order.tax || order.taxAmount || 0).toFixed(2)}</span>
            </div>
            {Number(order.discount || 0) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', marginBottom: '3px' }}>
                <span>Discount:</span>
                <span>-₹{Number(order.discount).toFixed(2)}</span>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '13px',
                marginTop: '8px',
                borderTop: '1px dashed #cbd5e1',
                paddingTop: '6px',
                color: '#0f172a'
              }}
            >
              <span>TOTAL PAID:</span>
              <span>₹{Number(order.total || order.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#334155',
              fontSize: '13px',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#94a3b8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
          >
            New Order
          </button>
          <button
            onClick={handlePrint}
            style={{
              flex: 1.2,
              padding: '10px',
              border: 'none',
              backgroundColor: '#7c3aed',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
          >
            <Printer size={15} /> Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
