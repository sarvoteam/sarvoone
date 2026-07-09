import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function InventoryForm({ isOpen, onClose, onSubmit, initialData = null }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Medical');
  const [stock, setStock] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(10);
  const [unit, setUnit] = useState('box');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [damagedStock, setDamagedStock] = useState(0);
  const [warehouseStock, setWarehouseStock] = useState('Central Warehouse');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSku(initialData.sku || '');
      setCategory(initialData.category || 'Medical');
      setStock(initialData.stock ?? 0);
      setReorderLevel(initialData.reorderLevel ?? 10);
      setUnit(initialData.unit || 'box');
      setPurchasePrice(initialData.purchasePrice || '');
      setSellingPrice(initialData.sellingPrice || '');
      setBatchNumber(initialData.batchNumber || '');
      setExpiryDate(initialData.expiryDate || '');
      setDamagedStock(initialData.damagedStock ?? 0);
      setWarehouseStock(initialData.warehouseStock || 'Central Warehouse');
    } else {
      setName('');
      setSku('');
      setCategory('Medical');
      setStock(0);
      setReorderLevel(10);
      setUnit('box');
      setPurchasePrice('');
      setSellingPrice('');
      setBatchNumber('');
      setExpiryDate('');
      setDamagedStock(0);
      setWarehouseStock('Central Warehouse');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !sku) {
      alert('Product Name and SKU are required.');
      return;
    }
    onSubmit({
      id: initialData?.id || Date.now(),
      name,
      sku,
      category,
      stock: Number(stock),
      reorderLevel: Number(reorderLevel),
      unit,
      purchasePrice: Number(purchasePrice),
      sellingPrice: Number(sellingPrice),
      batchNumber,
      expiryDate,
      damagedStock: Number(damagedStock),
      warehouseStock
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '540px',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        boxSizing: 'border-box',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f3f4f6',
          paddingBottom: '14px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>
            {initialData ? 'Edit Inventory Ledger' : 'Add Inventory Ledger'}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
              Product Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Paracetamol 500mg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                SKU Code *
              </label>
              <input
                type="text"
                placeholder="MED-PC-500"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#fff' }}
              >
                <option value="Medical">Medical</option>
                <option value="Electronics">Electronics</option>
                <option value="Hardware">Hardware</option>
                <option value="Supermarket">Supermarket</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Stock Count
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Reorder Level
              </label>
              <input
                type="number"
                value={reorderLevel}
                onChange={(e) => setReorderLevel(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Unit Type
              </label>
              <input
                type="text"
                placeholder="box"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Batch Number
              </label>
              <input
                type="text"
                placeholder="BAT-99201"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Damaged Stock
              </label>
              <input
                type="number"
                value={damagedStock}
                onChange={(e) => setDamagedStock(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Warehouse Location
              </label>
              <select
                value={warehouseStock}
                onChange={(e) => setWarehouseStock(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#fff' }}
              >
                <option value="Central Warehouse">Central Warehouse</option>
                <option value="City Retail Depot">City Retail Depot</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Purchase Price (₹)
              </label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
                Selling Price (₹)
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#ffffff', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', backgroundColor: '#7c3aed', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
