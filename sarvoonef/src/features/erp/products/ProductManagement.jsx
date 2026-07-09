import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, ShieldAlert } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Medical', brand: 'AstraMed', unit: 'strip', barcode: '8901043000212', sku: 'MED-PC-500', hsnCode: '30049011', gstRate: 12, mrp: 35, purchasePrice: 24, sellingPrice: 30, wholesalePrice: 28, stock: 120 },
  { id: 2, name: 'Amoxicillin 250mg', category: 'Medical', brand: 'Sandoz', unit: 'bottle', barcode: '8901043000213', sku: 'MED-AMX-250', hsnCode: '30041010', gstRate: 12, mrp: 98, purchasePrice: 70, sellingPrice: 85, wholesalePrice: 78, stock: 5 },
  { id: 3, name: 'Wireless Optical Mouse', category: 'Electronics', brand: 'Logitech', unit: 'piece', barcode: '8901043000214', sku: 'ELE-WM-04', hsnCode: '84716060', gstRate: 18, mrp: 999, purchasePrice: 650, sellingPrice: 850, wholesalePrice: 750, stock: 45 },
  { id: 4, name: 'LED Bulb 9W Premium', category: 'Hardware', brand: 'Philips', unit: 'piece', barcode: '8901043000215', sku: 'HDW-LED-9W', hsnCode: '85395000', gstRate: 18, mrp: 150, purchasePrice: 90, sellingPrice: 120, wholesalePrice: 100, stock: 0 }
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Medical');
  const [formBrand, setFormBrand] = useState('');
  const [formUnit, setFormUnit] = useState('piece');
  const [formBarcode, setFormBarcode] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formHsn, setFormHsn] = useState('');
  const [formGst, setFormGst] = useState(12);
  const [formMrp, setFormMrp] = useState(35);
  const [formPurchase, setFormPurchase] = useState(24);
  const [formSelling, setFormSelling] = useState(30);
  const [formWholesale, setFormWholesale] = useState(28);

  const handleDelete = (id) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormCategory('Medical');
    setFormBrand('');
    setFormUnit('piece');
    setFormBarcode('');
    setFormSku('');
    setFormHsn('');
    setFormGst(12);
    setFormMrp(35);
    setFormPurchase(24);
    setFormSelling(30);
    setFormWholesale(28);
    setIsEditing(false);
    setShowAddModal(true);
  };

  const handleOpenEdit = (p) => {
    setFormName(p.name);
    setFormCategory(p.category);
    setFormBrand(p.brand);
    setFormUnit(p.unit);
    setFormBarcode(p.barcode);
    setFormSku(p.sku);
    setFormHsn(p.hsnCode);
    setFormGst(p.gstRate);
    setFormMrp(p.mrp);
    setFormPurchase(p.purchasePrice);
    setFormSelling(p.sellingPrice);
    setFormWholesale(p.wholesalePrice);
    setIsEditing(true);
    setSelectedProd(p);
    setShowAddModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === selectedProd.id ? {
        ...p,
        name: formName,
        category: formCategory,
        brand: formBrand,
        unit: formUnit,
        barcode: formBarcode,
        sku: formSku,
        hsnCode: formHsn,
        gstRate: Number(formGst),
        mrp: Number(formMrp),
        purchasePrice: Number(formPurchase),
        sellingPrice: Number(formSelling),
        wholesalePrice: Number(formWholesale)
      } : p));
    } else {
      setProducts([...products, {
        id: Date.now(),
        name: formName,
        category: formCategory,
        brand: formBrand,
        unit: formUnit,
        barcode: formBarcode,
        sku: formSku,
        hsnCode: formHsn,
        gstRate: Number(formGst),
        mrp: Number(formMrp),
        purchasePrice: Number(formPurchase),
        sellingPrice: Number(formSelling),
        wholesalePrice: Number(formWholesale),
        stock: 50
      }]);
    }
    setShowAddModal(false);
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Product Master Catalog</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search SKU or name..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '200px', outline: 'none' }}
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff' }}
          >
            <option value="All">All Categories</option>
            <option value="Medical">Medical</option>
            <option value="Electronics">Electronics</option>
            <option value="Hardware">Hardware</option>
          </select>
          <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Product Name</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>SKU / Barcode</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>HSN / GST</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Rates (Purchase/Selling/MRP)</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>Brand: {p.brand} | per {p.unit}</div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div>SKU: <strong>{p.sku}</strong></div>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>Barcode: {p.barcode}</div>
                </td>
                <td style={{ padding: '12px' }}>{p.category}</td>
                <td style={{ padding: '12px' }}>
                  <div>HSN: {p.hsnCode}</div>
                  <div style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 600 }}>GST: {p.gstRate}%</div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontSize: '12px' }}>Purchase: ₹{p.purchasePrice} | Sell: ₹{p.sellingPrice}</div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#7c3aed' }}>MRP: ₹{p.mrp}</div>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleOpenEdit(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}><Edit size={14} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 16px', color: '#1f2937' }}>{isEditing ? 'Modify Product Catalog' : 'Catalog New Product'}</h3>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Product Name</label>
                <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Category</label>
                  <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff' }}>
                    <option value="Medical">Medical</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Brand</label>
                  <input type="text" value={formBrand} onChange={(e) => setFormBrand(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Unit</label>
                  <input type="text" placeholder="strip / box / piece" value={formUnit} onChange={(e) => setFormUnit(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Barcode</label>
                  <input type="text" value={formBarcode} onChange={(e) => setFormBarcode(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>SKU Code</label>
                  <input type="text" value={formSku} onChange={(e) => setFormSku(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>HSN Code</label>
                  <input type="text" value={formHsn} onChange={(e) => setFormHsn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>GST Tax %</label>
                  <input type="number" value={formGst} onChange={(e) => setFormGst(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>MRP (₹)</label>
                  <input type="number" value={formMrp} onChange={(e) => setFormMrp(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Purchase Price (₹)</label>
                  <input type="number" value={formPurchase} onChange={(e) => setFormPurchase(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Selling Price (₹)</label>
                  <input type="number" value={formSelling} onChange={(e) => setFormSelling(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Wholesale Price (₹)</label>
                  <input type="number" value={formWholesale} onChange={(e) => setFormWholesale(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '8px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: 600 }}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
