import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, DollarSign, Printer, CheckCircle } from 'lucide-react';

const availableItems = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'MED-PC-500', price: 5.50, category: 'Medical', stock: 120 },
  { id: 2, name: 'Amoxicillin 250mg', sku: 'MED-AMX-250', price: 9.80, category: 'Medical', stock: 20 },
  { id: 3, name: 'Wireless Optical Mouse', sku: 'ELE-WM-04', price: 19.99, category: 'Electronics', stock: 45 },
  { id: 4, name: 'LED Bulb 9W Premium', sku: 'HDW-LED-9W', price: 2.50, category: 'Hardware', stock: 32 },
  { id: 5, name: 'Organic Green Tea Bag', sku: 'SMK-GT-50', price: 4.99, category: 'Supermarket', stock: 85 }
];

export default function POSBilling() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, amount) => {
    const updated = cart.map(c => {
      if (c.id === id) {
        const nextQty = c.qty + amount;
        return nextQty > 0 ? { ...c, qty: nextQty } : null;
      }
      return c;
    }).filter(Boolean);
    setCart(updated);
  };

  const removeItem = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };

  // Math
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.18; // 18% GST
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + tax - discountAmount;

  const handleCheckout = (paymentMethod) => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    const order = {
      orderNo: 'POS-' + Math.floor(Math.random() * 900000 + 100000),
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal,
      tax,
      discount: discountAmount,
      total,
      paymentMethod
    };
    setLastOrder(order);
    setIsReceiptOpen(true);
    setCart([]);
  };

  const filteredItems = availableItems.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px', fontFamily: 'system-ui, sans-serif', height: 'calc(100vh - 120px)' }}>
      {/* Left panel: Item Grid selection */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Cashier Terminal POS</h2>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Scan SKU or Search name..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '220px', outline: 'none' }}
            />
          </div>
        </div>

        {/* Product Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => addToCart(item)}
              style={{ border: '1px solid #f3f4f6', borderRadius: '8px', padding: '14px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: '#f9fafb' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#7c3aed'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
            >
              <div style={{ display: 'inline-block', backgroundColor: '#eff6ff', color: '#1d4ed8', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                {item.category}
              </div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#1f2937', marginBottom: '4px', height: '36px', overflow: 'hidden' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>SKU: {item.sku}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#7c3aed', fontSize: '14px' }}>₹{item.price.toFixed(2)}</span>
                <span style={{ fontSize: '11px', color: item.stock > 10 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>{item.stock} left</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Cart Detail checkouts */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingCart size={18} /> Cart items ({cart.length})
        </h3>

        {/* Selected List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
          {cart.map(c => (
            <div key={c.id} style={{ display: 'flex', justify: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #f3f4f6', borderRadius: '8px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>₹{c.price.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
                <button onClick={() => updateQty(c.id, -1)} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}><Minus size={12} /></button>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>{c.qty}</span>
                <button onClick={() => addToCart(c)} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}><Plus size={12} /></button>
              </div>
              <button onClick={() => removeItem(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '13px' }}>
              Select items from the grid to fill cart
            </div>
          )}
        </div>

        {/* Calculator Summaries */}
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justify: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#6b7280' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justify: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#6b7280' }}>GST (18%)</span>
            <span style={{ fontWeight: 600 }}>₹{tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justify: 'space-between', fontSize: '13px', alignItems: 'center' }}>
            <span style={{ color: '#6b7280' }}>Discount %</span>
            <select 
              value={discount} 
              onChange={(e) => setDiscount(Number(e.target.value))}
              style={{ padding: '2px 6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '12px' }}
            >
              <option value={0}>0%</option>
              <option value={5}>5%</option>
              <option value={10}>10%</option>
              <option value={15}>15%</option>
            </select>
          </div>
          <div style={{ display: 'flex', justify: 'space-between', fontSize: '16px', fontWeight: 800, borderTop: '1px solid #f3f4f6', paddingTop: '8px', color: '#1f2937' }}>
            <span>Total Payable</span>
            <span style={{ color: '#7c3aed' }}>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button 
            onClick={() => handleCheckout('Cash')}
            disabled={cart.length === 0}
            style={{ padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#10b981', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', cursor: cart.length > 0 ? 'pointer' : 'not-allowed', opacity: cart.length > 0 ? 1 : 0.5 }}
          >
            <DollarSign size={16} /> Cash Pay
          </button>
          <button 
            onClick={() => handleCheckout('Card')}
            disabled={cart.length === 0}
            style={{ padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', cursor: cart.length > 0 ? 'pointer' : 'not-allowed', opacity: cart.length > 0 ? 1 : 0.5 }}
          >
            <CreditCard size={16} /> Card Pay
          </button>
        </div>
      </div>

      {/* Simulated thermal receipt printer modal */}
      {isReceiptOpen && lastOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '380px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#10b981', marginBottom: '12px' }}>
              <CheckCircle size={40} />
            </div>
            <h3 style={{ textAlign: 'center', margin: '0 0 16px', color: '#1f2937' }}>Payment Successful!</h3>

            {/* Thermal Receipt Body */}
            <div style={{ border: '1px solid #e5e7eb', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#374151' }}>
              <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>SARVO ONE STORE</div>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>123 Retail Lane, Hub</div>
              <div style={{ borderBottom: '1px dashed #d1d5db', paddingBottom: '6px', marginBottom: '8px' }}>
                <div>Order: {lastOrder.orderNo}</div>
                <div>Date: {lastOrder.date}</div>
                <div>Method: {lastOrder.paymentMethod}</div>
              </div>
              <div style={{ borderBottom: '1px dashed #d1d5db', paddingBottom: '6px', marginBottom: '8px' }}>
                {lastOrder.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{item.name} x {item.qty}</span>
                    <span>₹{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{lastOrder.subtotal.toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>GST (18%)</span><span>₹{lastOrder.tax.toFixed(2)}</span></div>
                {lastOrder.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444' }}><span>Discount</span><span>-₹{lastOrder.discount.toFixed(2)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}><span>TOTAL PAID</span><span>₹{lastOrder.total.toFixed(2)}</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button 
                onClick={() => setIsReceiptOpen(false)}
                style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', backgroundColor: '#fff', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
              <button 
                onClick={() => { alert('Receipt print command sent to thermal printer!'); setIsReceiptOpen(false); }}
                style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Printer size={16} /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
