import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function POSCartItem({ item, onUpdateQty, onRemove }) {
  const { name, sellingPrice, qty, id } = item;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 14px',
        border: '1px solid #f1f5f9',
        borderRadius: '10px',
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.01)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#f1f5f9';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ flex: 1, paddingRight: '8px' }}>
        <div style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b', marginBottom: '2px' }}>
          {name}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b' }}>
          ₹{Number(sellingPrice).toFixed(2)} each
        </div>
      </div>

      {/* Quantity adjustment controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px' }}>
        <button
          onClick={() => onUpdateQty(id, -1)}
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#334155';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <Minus size={12} />
        </button>

        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', minWidth: '18px', textAlign: 'center' }}>
          {qty}
        </span>

        <button
          onClick={() => onUpdateQty(id, 1)}
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#334155';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onRemove(id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#fef2f2';
          e.currentTarget.style.color = '#dc2626';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.color = '#ef4444';
        }}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
