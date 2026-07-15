import React from 'react';

export default function POSProductCard({ product, onAddToCart }) {
  const { name, sku, sellingPrice, category, stock } = product;

  // Determine stock styling
  let stockColor = '#10b981'; // Green
  let stockLabel = `${stock} left`;

  if (stock <= 0) {
    stockColor = '#ef4444'; // Red
    stockLabel = 'Out of Stock';
  } else if (stock <= 10) {
    stockColor = '#f59e0b'; // Orange
    stockLabel = `${stock} low`;
  }

  const isOutOfStock = stock <= 0;

  return (
    <div
      onClick={() => !isOutOfStock && onAddToCart(product)}
      style={{
        border: '1px solid #f1f5f9',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isOutOfStock ? 0.6 : 1,
        position: 'relative',
        overflow: 'hidden',
      }}
      className="pos-product-card"
      onMouseEnter={(e) => {
        if (!isOutOfStock) {
          e.currentTarget.style.borderColor = '#c084fc';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(124, 58, 237, 0.08), 0 4px 6px -4px rgba(124, 58, 237, 0.08)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isOutOfStock) {
          e.currentTarget.style.borderColor = '#f1f5f9';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.02)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div>
        {/* Category Badge */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#f5f3ff',
            color: '#7c3aed',
            fontSize: '10px',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '9999px',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {category || 'General'}
        </div>

        {/* Product Name */}
        <h4
          style={{
            margin: '0 0 6px 0',
            fontWeight: 600,
            fontSize: '14px',
            color: '#1e293b',
            lineHeight: '1.4',
            minHeight: '40px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </h4>

        {/* SKU */}
        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '14px', fontFamily: 'monospace' }}>
          {sku}
        </div>
      </div>

      {/* Footer (Price and Stock) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #f8fafc',
          paddingTop: '12px',
          marginTop: '4px'
        }}
      >
        <span style={{ fontWeight: 700, color: '#7c3aed', fontSize: '15px' }}>
          ₹{Number(sellingPrice).toFixed(2)}
        </span>
        <span style={{ fontSize: '11px', color: stockColor, fontWeight: 600 }}>
          {stockLabel}
        </span>
      </div>
    </div>
  );
}
