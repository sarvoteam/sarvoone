import React, { useState } from 'react';
import { Barcode, Printer, Layers } from 'lucide-react';

const productsList = [
  { sku: 'MED-PC-500', name: 'Paracetamol 500mg' },
  { sku: 'MED-AMX-250', name: 'Amoxicillin 250mg' },
  { sku: 'ELE-WM-04', name: 'Wireless Optical Mouse' },
  { sku: 'HDW-LED-9W', name: 'LED Bulb 9W Premium' }
];

export default function BarcodeQR() {
  const [selectedProduct, setSelectedProduct] = useState(productsList[0]);
  const [qty, setQty] = useState(24);

  const handlePrint = (e) => {
    e.preventDefault();
    alert(`Sending command to print ${qty} barcode labels for SKU ${selectedProduct.sku} ("${selectedProduct.name}")...`);
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '650px' }}>
      <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '14px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Barcode & QR Label Generator</h2>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>Select stock items and configure print dimensions for sticky tag labels.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Form controls */}
        <form onSubmit={handlePrint} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Select Stock Product</label>
            <select 
              value={selectedProduct.sku}
              onChange={(e) => setSelectedProduct(productsList.find(p => p.sku === e.target.value))}
              style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff' }}
            >
              {productsList.map(p => (
                <option key={p.sku} value={p.sku}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Labels Count (qty)</label>
            <input 
              type="number" 
              value={qty} 
              onChange={(e) => setQty(Number(e.target.value))} 
              style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Sheet Size Format</label>
            <select style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff' }}>
              <option>A4 Sheet (3x8 columns = 24 labels)</option>
              <option>Thermal Roll (1 label wide)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '12px', display: 'flex', justify: 'center', align: 'center', width: '100%', marginTop: '10px' }}>
            <Printer size={16} /> Print Barcodes Sheet
          </button>
        </form>

        {/* Live Preview panel */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center', textAlign: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', uppercase: 'true' }}>Label Sticky Tag Preview</span>
          
          <div style={{ backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', padding: '14px 20px', width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#1f2937', height: '14px', overflow: 'hidden' }}>{selectedProduct.name}</div>
            
            {/* Barcode representation */}
            <div style={{ display: 'flex', gap: '2px', height: '36px' }}>
              <div style={{ width: '3px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '1px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '4px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '1px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '2px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '1px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '5px', height: '100%', backgroundColor: '#111827' }}></div>
              <div style={{ width: '2px', height: '100%', backgroundColor: '#111827' }}></div>
            </div>

            <div style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 600, color: '#4b5563' }}>{selectedProduct.sku}</div>
          </div>

          <span style={{ fontSize: '11px', color: '#6b7280' }}>Resolution: 300 DPI</span>
        </div>
      </div>
    </div>
  );
}
