import React from 'react';

export default function StockStatusBadge({ stock, reorderLevel = 10 }) {
  let badgeStyle = {
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  };

  if (stock === 0) {
    return (
      <span style={{ 
        ...badgeStyle, 
        backgroundColor: '#fee2e2', 
        color: '#dc2626' 
      }}>
        ● Out of Stock
      </span>
    );
  }

  if (stock <= reorderLevel) {
    return (
      <span style={{ 
        ...badgeStyle, 
        backgroundColor: '#fef3c7', 
        color: '#d97706' 
      }}>
        ● Low Stock
      </span>
    );
  }

  return (
    <span style={{ 
      ...badgeStyle, 
      backgroundColor: '#d1fae5', 
      color: '#059669' 
    }}>
      ● In Stock
    </span>
  );
}
