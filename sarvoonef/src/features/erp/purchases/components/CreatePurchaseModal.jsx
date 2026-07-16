import React, { useState, useEffect } from 'react';
import { X, Trash2, Loader2 } from 'lucide-react';
import { createPurchaseApi } from '../api/purchasesApi';

export default function CreatePurchaseModal({ isOpen, onClose, suppliers, products, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [supplierId, setSupplierId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState('Ordered');
  const [addedItems, setAddedItems] = useState([]);
  
  // Sub-form state for adding items
  const [productId, setProductId] = useState('');
  const [itemQty, setItemQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  // Initialize and reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const rand = Math.floor(100 + Math.random() * 900);
      setOrderNumber(`PO-${dateStr}-${rand}`);
      setSupplierId(suppliers[0]?.id || '');
      setStatus('Ordered');
      setAddedItems([]);
      setProductId('');
      setItemQty(1);
      setItemPrice(0);
    }
  }, [isOpen, suppliers]);

  if (!isOpen) return null;

  // When product changes in sub-form, pre-populate price
  const handleProductChange = (prodId) => {
    setProductId(prodId);
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      setItemPrice(prod.purchasePrice || 0);
    } else {
      setItemPrice(0);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!productId) {
      alert('Please select a product.');
      return;
    }
    if (Number(itemQty) <= 0) {
      alert('Quantity must be greater than 0.');
      return;
    }
    
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    // Check if item already added
    const existingIndex = addedItems.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      const updated = [...addedItems];
      updated[existingIndex].quantity += Number(itemQty);
      updated[existingIndex].total = updated[existingIndex].quantity * updated[existingIndex].price;
      setAddedItems(updated);
    } else {
      const newItem = {
        productId: prod.id,
        name: prod.name,
        sku: prod.sku,
        quantity: Number(itemQty),
        price: Number(itemPrice),
        total: Number(itemQty) * Number(itemPrice)
      };
      setAddedItems([...addedItems, newItem]);
    }
    
    // Reset item select
    setProductId('');
    setItemQty(1);
    setItemPrice(0);
  };

  const handleRemoveItem = (index) => {
    setAddedItems(addedItems.filter((_, i) => i !== index));
  };

  // Calculations
  const computedSubtotal = addedItems.reduce((sum, item) => sum + item.total, 0);
  const computedTax = Math.round(computedSubtotal * 0.18 * 100) / 100; // 18% GST
  const computedTotal = computedSubtotal + computedTax;

  const handleSubmitPurchaseOrder = async (e) => {
    e.preventDefault();
    if (!supplierId) {
      alert('Please select a supplier.');
      return;
    }
    if (addedItems.length === 0) {
      alert('Please add at least one product to the purchase order.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        supplierId,
        orderNumber,
        status,
        totalAmount: computedTotal,
        taxAmount: computedTax,
        items: addedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          gst: 18,
          total: item.total
        }))
      };
      
      const response = await createPurchaseApi(payload);
      if (response.data && response.data.success) {
        onSuccess();
        onClose();
      } else {
        alert('Failed to save purchase order.');
      }
    } catch (err) {
      console.error('Error creating purchase order:', err);
      alert(err.response?.data?.message || 'Error saving purchase order to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '680px', borderRadius: '16px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Create Purchase Order</h3>
          <button 
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', transition: 'color 0.15s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitPurchaseOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header fields grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Partner Supplier *</label>
              <select 
                required
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="" disabled>Select Supplier...</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>PO Number</label>
              <input 
                type="text" 
                required 
                value={orderNumber} 
                onChange={(e) => setOrderNumber(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Delivery Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="Ordered">Ordered</option>
                <option value="Received">Received</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Order Date</label>
              <input 
                type="date" 
                defaultValue={new Date().toISOString().slice(0, 10)} 
                disabled 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', color: '#64748b', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          {/* Add Item form card */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>Add Procurement Items</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Select Product</label>
                <select 
                  value={productId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12.5px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <option value="">Choose item...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  value={itemQty} 
                  onChange={(e) => setItemQty(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Unit Price (₹)</label>
                <input 
                  type="number" 
                  min="0.01" 
                  step="0.01"
                  value={itemPrice} 
                  onChange={(e) => setItemPrice(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }} 
                />
              </div>
              <button 
                type="button"
                onClick={handleAddItem}
                style={{ padding: '9px 16px', border: 'none', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: '#fff', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(124, 58, 237, 0.15)' }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Added items list table */}
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>Itemized Ledger</h4>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(124, 58, 237, 0.15)' }}>
                    <th style={{ padding: '10px 12px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>Product Name</th>
                    <th style={{ padding: '10px 12px' }}>Qty</th>
                    <th style={{ padding: '10px 12px' }}>Unit Price</th>
                    <th style={{ padding: '10px 12px' }}>Total</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {addedItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                        No items added yet. Choose a product above to build your ledger.
                      </td>
                    </tr>
                  ) : (
                    addedItems.map((item, index) => (
                      <tr key={`${item.productId}-${index}`} style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.06)' }}>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ fontWeight: 600, color: '#334155' }}>{item.name}</div>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>{item.sku}</span>
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: '#334155' }}>{item.quantity}</td>
                        <td style={{ padding: '10px 12px', color: '#475569' }}>₹{item.price.toFixed(2)}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>₹{item.total.toFixed(2)}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <button 
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial summary blocks */}
          {addedItems.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignSelf: 'flex-end', width: '220px', borderTop: '2px solid #f1f5f9', paddingTop: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>₹{computedSubtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>GST (18%):</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>₹{computedTax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a', fontSize: '14.5px', marginTop: '4px' }}>
                <span>Total Value:</span>
                <span>₹{computedTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#475569' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary"
              style={{ flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Creating...
                </>
              ) : (
                'Submit Purchase Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
