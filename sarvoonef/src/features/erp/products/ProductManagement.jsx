import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { 
  getInventoryProducts, 
  createInventoryProduct, 
  updateInventoryProduct, 
  deleteInventoryProduct 
} from '../inventory/services/inventoryService';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  
  // Loaders and errors state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const loadProductsList = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);
    try {
      const response = await getInventoryProducts();
      if (response.data && response.data.success) {
        setProducts(response.data.data);
      } else {
        setError('Failed to parse products.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve products catalog from database.');
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    loadProductsList();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product from catalog? This will remove related stock records.')) {
      setActionLoading(true);
      try {
        const response = await deleteInventoryProduct(id);
        if (response.data && response.data.success) {
          setProducts(prev => prev.filter(p => p.id !== id));
        }
      } catch (err) {
        console.error(err);
        alert('Failed to remove product from catalog.');
      } finally {
        setActionLoading(false);
      }
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
    setFormName(p.name || '');
    setFormCategory(p.category || 'Medical');
    setFormBrand(p.brand || '');
    setFormUnit(p.unit || 'piece');
    setFormBarcode(p.barcode || '');
    setFormSku(p.sku || '');
    setFormHsn(p.hsnCode || p.hsn || '');
    setFormGst(p.gstRate || p.gst || 12);
    setFormMrp(p.mrp || 0);
    setFormPurchase(p.purchasePrice || 0);
    setFormSelling(p.sellingPrice || 0);
    setFormWholesale(p.wholesalePrice || 0);
    setIsEditing(true);
    setSelectedProd(p);
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    const payload = {
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
    };

    try {
      if (isEditing) {
        const response = await updateInventoryProduct(selectedProd.id, payload);
        if (response.data && response.data.success) {
          const updated = response.data.data;
          setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        }
      } else {
        const response = await createInventoryProduct({
          ...payload,
          stock: 0 // New catalog products start with 0 stock
        });
        if (response.data && response.data.success) {
          const created = response.data.data;
          setProducts(prev => [created, ...prev]);
        }
      }
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save product in database catalog.');
    } finally {
      setActionLoading(false);
    }
  };

  // Get unique categories list dynamically
  const uniqueCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filtered = products.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || 
                          (p.sku || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Product Master Catalog</h2>
          <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#6b7280' }}>Define master products, set tax structures, and configure purchase/sale rate specifications.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => loadProductsList(false)} 
            className="btn-secondary" 
            style={{ padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Refresh catalog"
          >
            <RefreshCw size={14} />
          </button>
          <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, maxWidth: '280px' }}>
          <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
          <input 
            type="text" 
            placeholder="Search SKU or name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '100%', outline: 'none' }}
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff', outline: 'none', cursor: 'pointer' }}
        >
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Loading state */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#6b7280', minHeight: '300px' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Loading product catalog...</span>
        </div>
      ) : error ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#dc2626', padding: '20px', textAlign: 'center', minHeight: '300px' }}>
          <AlertCircle size={32} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{error}</span>
          <button onClick={() => loadProductsList()} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Try Again</button>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#9ca3af', padding: '20px', textAlign: 'center', minHeight: '300px' }}>
          <AlertCircle size={32} style={{ marginBottom: '10px' }} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>No catalog entries found.</span>
        </div>
      ) : (
        /* Data Table */
        <div className="dashboard-table-wrapper" style={{ overflowX: 'auto' }}>
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
                <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6', hover: { backgroundColor: '#f9fafb' } }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Brand: {p.brand || 'N/A'} | per {p.unit || 'piece'}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div>SKU: <strong>{p.sku}</strong></div>
                    <div style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>Barcode: {p.barcode || 'N/A'}</div>
                  </td>
                  <td style={{ padding: '12px' }}>{p.category || 'General'}</td>
                  <td style={{ padding: '12px' }}>
                    <div>HSN: {p.hsnCode || 'N/A'}</div>
                    <div style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 600 }}>GST: {p.gstRate || 0}%</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px' }}>Purchase: ₹{(p.purchasePrice || 0).toLocaleString()} | Sell: ₹{(p.sellingPrice || 0).toLocaleString()}</div>
                    {p.wholesalePrice > 0 && <div style={{ fontSize: '11px', color: '#059669' }}>Wholesale: ₹{(p.wholesalePrice).toLocaleString()}</div>}
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#7c3aed' }}>MRP: ₹{(p.mrp || 0).toLocaleString()}</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleOpenEdit(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', padding: '4px' }} title="Edit"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '24px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#1f2937', fontSize: '16px', fontWeight: 700 }}>{isEditing ? 'Modify Product Catalog' : 'Catalog New Product'}</h3>
              {actionLoading && <Loader2 className="animate-spin" size={16} style={{ color: '#7c3aed' }} />}
            </div>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Product Name</label>
                <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Category</label>
                  <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#fff', outline: 'none' }}>
                    <option value="Medical">Medical</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Supermarket">Supermarket</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Brand</label>
                  <input type="text" value={formBrand} onChange={(e) => setFormBrand(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Unit</label>
                  <input type="text" placeholder="strip / box / piece" value={formUnit} onChange={(e) => setFormUnit(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Barcode</label>
                  <input type="text" value={formBarcode} onChange={(e) => setFormBarcode(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>SKU Code</label>
                  <input type="text" required value={formSku} onChange={(e) => setFormSku(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>HSN Code</label>
                  <input type="text" value={formHsn} onChange={(e) => setFormHsn(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>GST Tax %</label>
                  <input type="number" value={formGst} onChange={(e) => setFormGst(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>MRP (₹)</label>
                  <input type="number" value={formMrp} onChange={(e) => setFormMrp(Number(e.target.value))} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Purchase Price (₹)</label>
                  <input type="number" value={formPurchase} onChange={(e) => setFormPurchase(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Selling Price (₹)</label>
                  <input type="number" value={formSelling} onChange={(e) => setFormSelling(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>Wholesale Price (₹)</label>
                  <input type="number" value={formWholesale} onChange={(e) => setFormWholesale(Number(e.target.value))} style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }} disabled={actionLoading}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '8px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} disabled={actionLoading}>
                  {actionLoading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
