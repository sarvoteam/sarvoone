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
  const [formStock, setFormStock] = useState(0);
  const [formReorder, setFormReorder] = useState(5);
  const [formWarehouse, setFormWarehouse] = useState('Central Warehouse');
  const [formBatch, setFormBatch] = useState('');
  const [formExpiry, setFormExpiry] = useState('');

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
    setFormStock(0);
    setFormReorder(5);
    setFormWarehouse('Central Warehouse');
    setFormBatch('');
    setFormExpiry('');
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
    setFormStock(p.stock ?? p.currentStock ?? 0);
    setFormReorder(p.reorderLevel ?? 5);
    setFormWarehouse(p.warehouseStock || 'Central Warehouse');
    setFormBatch(p.batchNumber || '');
    setFormExpiry(p.expiryDate || '');
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
      wholesalePrice: Number(formWholesale),
      stock: Number(formStock),
      reorderLevel: Number(formReorder),
      warehouseStock: formWarehouse,
      batchNumber: formBatch,
      expiryDate: formExpiry
    };

    try {
      if (isEditing) {
        const response = await updateInventoryProduct(selectedProd.id, payload);
        if (response.data && response.data.success) {
          const updated = response.data.data;
          setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        }
      } else {
        const response = await createInventoryProduct(payload);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Inline styles for placeholder targeting */}
      <style dangerouslySetInnerHTML={{__html: `
        .search-input-placeholder::placeholder {
          color: #a78bfa !important;
        }
      `}} />

      {/* Top Filter and Actions Card (Purple Gradient) */}
      <div style={{ 
        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', 
        borderRadius: '16px', 
        padding: '20px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px',
        boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.25)'
      }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '500px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '12px', color: '#7c3aed' }} size={16} />
            <input 
              type="text" 
              placeholder="Search SKU or name..." 
              className="search-input-placeholder"
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                padding: '10px 12px 10px 38px', 
                border: '1px solid rgba(124, 58, 237, 0.25)', 
                borderRadius: '8px', 
                fontSize: '13px', 
                width: '100%', 
                outline: 'none', 
                backgroundColor: '#faf5ff',
                color: '#5b21b6',
                fontWeight: 600,
                transition: 'all 0.15s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ffffff';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.35)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.25)';
                e.target.style.backgroundColor = '#faf5ff';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ 
              padding: '10px 14px', 
              border: '1px solid rgba(124, 58, 237, 0.25)', 
              borderRadius: '8px', 
              fontSize: '13px', 
              backgroundColor: '#faf5ff', 
              color: '#5b21b6', 
              fontWeight: 600,
              outline: 'none', 
              cursor: 'pointer', 
              transition: 'all 0.15s ease' 
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ffffff';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.35)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(124, 58, 237, 0.25)';
              e.target.style.backgroundColor = '#faf5ff';
              e.target.style.boxShadow = 'none';
            }}
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat} style={{ color: '#0f172a', backgroundColor: '#ffffff' }}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => loadProductsList(false)} 
            style={{ 
              padding: '10px 12px', 
              borderRadius: '8px', 
              border: '1px solid rgba(124, 58, 237, 0.25)', 
              backgroundColor: '#faf5ff', 
              color: '#7c3aed', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              transition: 'all 0.15s ease' 
            }}
            title="Refresh catalog"
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#faf5ff'; }}
          >
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={handleOpenAdd} 
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              border: 'none', 
              backgroundColor: '#ffffff', 
              color: '#7c3aed', 
              fontSize: '13px', 
              fontWeight: 700, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
              transition: 'all 0.15s ease' 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 255, 255, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; }}
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Main Table Card Wrapper */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '16px', 
        border: '1px solid #e2e8f0', 
        padding: '24px', 
        boxShadow: '0 4px 20px -2px rgba(49, 16, 132, 0.04), 0 2px 8px -1px rgba(49, 16, 132, 0.02)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}>
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
            <button onClick={() => loadProductsList()} style={{ padding: '6px 12px', fontSize: '12px' }}>Try Again</button>
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
                <tr style={{ backgroundColor: '#faf5ff', borderBottom: '2px solid rgba(124, 58, 237, 0.12)' }}>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', borderTopLeftRadius: '12px' }}>Product Name</th>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>SKU Code</th>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Category</th>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Stock Qty</th>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>GST Tax</th>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Rates (Purchase / Selling / MRP)</th>
                  <th style={{ padding: '16px 20px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', textAlign: 'right', borderTopRightRadius: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.05)', transition: 'background-color 0.15s ease' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Unit: {p.unit || 'piece'}</div>
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#334155' }}>
                      {p.sku}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#475569', fontWeight: 500 }}>{p.category || 'General'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, backgroundColor: (p.currentStock || 0) <= 5 ? '#fef2f2' : '#e0e7ff', color: (p.currentStock || 0) <= 5 ? '#ef4444' : '#4f46e5', display: 'inline-block' }}>
                        {p.currentStock || 0}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#7c3aed' }}>
                      {p.gstRate || 0}%
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '12.5px', color: '#334155' }}>
                        Purchase: <strong style={{ color: '#0f172a' }}>₹{(p.purchasePrice || 0).toLocaleString()}</strong> | Sell: <strong style={{ color: '#0f172a' }}>₹{(p.sellingPrice || 0).toLocaleString()}</strong>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>MRP: ₹{(p.mrp || 0).toLocaleString()}</div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleOpenEdit(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', transition: 'color 0.15s ease' }} title="Edit"><Edit size={15} /></button>
                        <button onClick={() => handleDelete(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px', transition: 'color 0.15s ease' }} title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '480px', borderRadius: '14px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', boxSizing: 'border-box' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: 800 }}>
                {isEditing ? 'Modify Product Specifications' : 'Catalog New Product'}
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '18px', fontWeight: 600 }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Product Name *</label>
                <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>SKU Code *</label>
                  <input type="text" required value={formSku} onChange={(e) => setFormSku(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Category</label>
                  <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    <option value="Medical">Medical</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Supermarket">Supermarket</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Unit Type (e.g. piece, box)</label>
                  <input type="text" value={formUnit} onChange={(e) => setFormUnit(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Initial Stock Qty</label>
                  <input type="number" value={formStock} onChange={(e) => setFormStock(Number(e.target.value))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Purchase Price (₹)</label>
                  <input type="number" step="any" value={formPurchase} onChange={(e) => setFormPurchase(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Selling Price (₹)</label>
                  <input type="number" step="any" value={formSelling} onChange={(e) => setFormSelling(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>MRP (₹) *</label>
                  <input type="number" step="any" value={formMrp} onChange={(e) => setFormMrp(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>GST Tax Rate (%)</label>
                <input type="number" value={formGst} onChange={(e) => setFormGst(Number(e.target.value))} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', backgroundColor: '#fff', cursor: 'pointer' }} disabled={actionLoading}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: '#7c3aed', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }} disabled={actionLoading}>
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
