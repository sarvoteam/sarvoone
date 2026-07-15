import React from 'react';
import { Search, ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import usePOSProducts from '../hooks/usePOSProducts';
import POSProductCard from '../components/POSProductCard';
import POSCartItem from '../components/POSCartItem';
import POSReceiptModal from '../components/POSReceiptModal';
import { formatCurrency } from '../utils/salesFormatter';
import { DISCOUNT_OPTIONS } from '../constants/salesConstants';

export default function POSBillingPage() {
  const {
    filteredProducts,
    loading,
    error,
    search,
    setSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    cart,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    discount,
    setDiscount,
    subtotal,
    tax,
    total,
    isReceiptOpen,
    setIsReceiptOpen,
    lastOrder,
    checkoutLoading,
    handleCheckout,
    refetchProducts
  } = usePOSProducts();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gap: '20px',
        height: 'calc(100vh - 120px)',
        minHeight: '500px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Left panel: Product Selector */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              POS Billing Terminal
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              Quickly search products, apply discounts and process payments.
            </p>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} size={16} />
            <input
              type="text"
              placeholder="Search product SKU, name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '10px 14px 10px 36px',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '13px',
                width: '240px',
                outline: 'none',
                transition: 'all 0.15s',
                backgroundColor: '#f8fafc',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#c084fc';
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(192, 132, 252, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        {categories.length > 1 && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              borderBottom: '1px solid #f1f5f9',
              scrollbarWidth: 'none',
            }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? '#7c3aed' : '#e2e8f0',
                  backgroundColor: selectedCategory === cat ? '#7c3aed' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#64748b',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic products list area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: '#64748b' }}>
              <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
              <span>Fetching product catalog...</span>
            </div>
          ) : error ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: '#ef4444', textAlign: 'center', padding: '0 24px' }}>
              <AlertCircle size={32} />
              <span style={{ fontWeight: 600 }}>{error}</span>
              <button
                onClick={refetchProducts}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#7c3aed',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '14px' }}>
              No products match your search or filters.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '16px',
              }}
            >
              {filteredProducts.map(product => (
                <POSProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Cart Details & Checkout */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={18} style={{ color: '#7c3aed' }} /> Cart Items ({cart.length})
          </h3>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Cart Item list */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
          {cart.map(item => (
            <POSCartItem
              key={item.id}
              item={item}
              onUpdateQty={updateQty}
              onRemove={removeItem}
            />
          ))}

          {cart.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: '#94a3b8', padding: '40px 0' }}>
              <ShoppingCart size={36} strokeWidth={1.5} />
              <span style={{ fontSize: '13px' }}>Select items from the catalog to build cart</span>
            </div>
          )}
        </div>

        {/* Pricing calculations */}
        <div
          style={{
            borderTop: '1px solid #f1f5f9',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatCurrency(subtotal)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
            <span>GST (18%)</span>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatCurrency(tax)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', alignItems: 'center' }}>
            <span>Discount</span>
            <select
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#1e293b',
                backgroundColor: '#fff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {DISCOUNT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}%</option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: 800,
              borderTop: '1px solid #f1f5f9',
              paddingTop: '14px',
              color: '#0f172a',
              marginTop: '4px'
            }}
          >
            <span>Total Payable</span>
            <span style={{ color: '#7c3aed', fontSize: '18px' }}>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Checkout actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={() => handleCheckout('Cash')}
            disabled={cart.length === 0 || checkoutLoading}
            style={{
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#10b981',
              color: '#fff',
              fontWeight: 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: (cart.length > 0 && !checkoutLoading) ? 'pointer' : 'not-allowed',
              opacity: (cart.length > 0 && !checkoutLoading) ? 1 : 0.5,
              transition: 'all 0.15s',
              boxShadow: cart.length > 0 ? '0 4px 6px -1px rgba(16, 185, 129, 0.2)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (cart.length > 0 && !checkoutLoading) e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              if (cart.length > 0 && !checkoutLoading) e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            {checkoutLoading ? <Loader2 className="animate-spin" size={16} /> : 'Cash Payment'}
          </button>

          <button
            onClick={() => handleCheckout('Card')}
            disabled={cart.length === 0 || checkoutLoading}
            style={{
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: (cart.length > 0 && !checkoutLoading) ? 'pointer' : 'not-allowed',
              opacity: (cart.length > 0 && !checkoutLoading) ? 1 : 0.5,
              transition: 'all 0.15s',
              boxShadow: cart.length > 0 ? '0 4px 6px -1px rgba(59, 130, 246, 0.2)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (cart.length > 0 && !checkoutLoading) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              if (cart.length > 0 && !checkoutLoading) e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
          >
            {checkoutLoading ? <Loader2 className="animate-spin" size={16} /> : 'Card Payment'}
          </button>
        </div>
      </div>

      {/* Virtual Receipt Success Modal */}
      <POSReceiptModal
        isOpen={isReceiptOpen}
        order={lastOrder}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
}
