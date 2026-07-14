import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  Edit, 
  Trash2, 
  AlertCircle,
  Barcode,
  Loader2,
  RefreshCw,
  Eye
} from 'lucide-react';
import StockStatusBadge from '../components/StockStatusBadge';
import InventoryForm from '../components/InventoryForm';
import InventoryDetailModal from '../components/InventoryDetailModal';
import { 
  getInventoryProducts, 
  createInventoryProduct, 
  updateInventoryProduct, 
  deleteInventoryProduct 
} from '../services/inventoryService';
import './InventoryList.css';

export default function InventoryList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // State for loaders, messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Load products from backend API
  const loadProducts = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);
    try {
      const response = await getInventoryProducts();
      if (response.data && response.data.success) {
        const data = response.data.data;
        setProducts(data);
        
        // Retain selection if the selected product still exists
        if (data.length > 0) {
          const currentSelected = selectedProduct ? data.find(p => p.id === selectedProduct.id) : null;
          setSelectedProduct(currentSelected);
        } else {
          setSelectedProduct(null);
        }
      } else {
        setError('Unexpected API response structure.');
      }
    } catch (err) {
      console.error('Error fetching inventory products:', err);
      setError('Could not connect to server. Please try again.');
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleFormSubmit = async (productData) => {
    setActionLoading(true);
    try {
      if (editingProduct) {
        // Edit mode
        const response = await updateInventoryProduct(editingProduct.id, productData);
        if (response.data && response.data.success) {
          const updatedProduct = response.data.data;
          setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
          if (selectedProduct?.id === updatedProduct.id) {
            setSelectedProduct(updatedProduct);
          }
        }
      } else {
        // Add mode
        const response = await createInventoryProduct(productData);
        if (response.data && response.data.success) {
          const newProduct = response.data.data;
          setProducts(prev => [newProduct, ...prev]);
          setSelectedProduct(newProduct);
        }
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert(err.response?.data?.message || 'Failed to save product details. Check required fields.');
    } finally {
      setActionLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditModal = (e, product) => {
    e.stopPropagation();
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (e, productId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item from inventory?')) {
      setActionLoading(true);
      try {
        const response = await deleteInventoryProduct(productId);
        if (response.data && response.data.success) {
          const filtered = products.filter(p => p.id !== productId);
          setProducts(filtered);
          if (selectedProduct?.id === productId) {
            setSelectedProduct(filtered[0] || null);
          }
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete item from database.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const adjustStock = async (product, amount) => {
    if (!product) return;
    const nextStock = Math.max(0, (product.stock || 0) + amount);
    
    // Optimistic UI update
    const previousProducts = [...products];
    const previousSelected = { ...selectedProduct };
    
    const updatedLocal = { ...product, stock: nextStock, currentStock: nextStock };
    setProducts(prev => prev.map(p => p.id === product.id ? updatedLocal : p));
    if (selectedProduct?.id === product.id) {
      setSelectedProduct(updatedLocal);
    }

    try {
      const response = await updateInventoryProduct(product.id, {
        ...product,
        stock: nextStock
      });
      if (response.data && response.data.success) {
        const updatedProduct = response.data.data;
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        if (selectedProduct?.id === updatedProduct.id) {
          setSelectedProduct(updatedProduct);
        }
      }
    } catch (err) {
      console.error('Error adjusting stock:', err);
      // Revert on error
      setProducts(previousProducts);
      setSelectedProduct(previousSelected);
      alert('Failed to update stock on the server.');
    }
  };

  // Extract unique categories dynamically from database products
  const availableCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.sku || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-container" style={{ width: '100%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Table Main Panel */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '500px', width: '100%', boxSizing: 'border-box' }}>
        
        <div className="inventory-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Inventory Control Center</h2>
            <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#6b7280' }}>Manage product records, track real-time stock levels, and monitor warehouse parameters.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => loadProducts(false)} 
              className="btn-secondary" 
              style={{ padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Refresh ledger"
            >
              <RefreshCw size={14} />
            </button>
            <button className="btn-primary" onClick={openAddModal} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} /> Add Stock Item
            </button>
          </div>
        </div>

        <div className="actions-left" style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div className="search-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, maxWidth: '280px' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search SKU or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px 6px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '100%', outline: 'none' }}
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff', outline: 'none', cursor: 'pointer' }}
          >
            {availableCategories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#6b7280' }}>
            <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Loading inventory records...</span>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#dc2626', padding: '20px', textAlign: 'center' }}>
            <AlertCircle size={32} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>{error}</span>
            <button onClick={() => loadProducts()} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Try Again</button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#9ca3af', padding: '20px', textAlign: 'center' }}>
            <AlertCircle size={32} style={{ marginBottom: '10px' }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>No products matched your criteria.</span>
            <span style={{ fontSize: '11px', marginTop: '2px' }}>Try adjusting filters or add a new stock item.</span>
          </div>
        ) : (
          /* Data Table */
          <div className="inventory-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="inventory-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Product</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>SKU & Barcode</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Logistics</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Warehouse</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Stock Qty</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Damaged</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Purchase/Selling</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '14px 10px', color: '#6b7280', fontWeight: 600, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr 
                    key={p.id} 
                    onClick={() => handleRowClick(p)}
                    style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background-color 0.15s' }}
                  >
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.name}</div>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>Category: {p.category || 'General'}</span>
                      {p.brand && <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '6px' }}>| Brand: {p.brand}</span>}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontWeight: 500 }}>{p.sku}</div>
                      {p.barcode && <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>BC: {p.barcode}</span>}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <div>Batch: <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.batchNumber || 'N/A'}</span></div>
                      {p.expiryDate && <span style={{ fontSize: '11px', color: '#be185d' }}>Exp: {p.expiryDate}</span>}
                    </td>
                    <td style={{ padding: '14px 10px', color: '#4b5563' }}>
                      {p.warehouseStock || 'Central Warehouse'}
                    </td>
                    <td style={{ padding: '14px 10px', fontWeight: 700, color: (p.stock || 0) <= (p.reorderLevel || 0) ? '#dc2626' : '#111827' }}>
                      {p.stock} {p.unit || 'unit'}s
                      <div style={{ fontSize: '10px', fontWeight: 500, color: '#6b7280', marginTop: '2px' }}>Min: {p.reorderLevel || 0}</div>
                    </td>
                    <td style={{ padding: '14px 10px', color: p.damagedStock > 0 ? '#ef4444' : '#10b981', fontWeight: p.damagedStock > 0 ? 600 : 400 }}>
                      {p.damagedStock || 0} {p.unit || 'unit'}s
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontSize: '12px' }}>P: ₹{(p.purchasePrice || 0).toLocaleString()}</div>
                      <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: 600 }}>S: ₹{(p.sellingPrice || 0).toLocaleString()}</div>
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <StockStatusBadge stock={p.stock} reorderLevel={p.reorderLevel} />
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', paddingRight: '4px' }}>
                        <button onClick={() => handleRowClick(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#7c3aed', padding: '4px', borderRadius: '4px' }} title="View Details"><Eye size={14} /></button>
                        <button onClick={(e) => openEditModal(e, p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', padding: '4px', borderRadius: '4px' }} title="Edit"><Edit size={14} /></button>
                        <button onClick={(e) => handleDelete(e, p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px', borderRadius: '4px' }} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Item Detail Modal */}
      <InventoryDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        onAdjustStock={adjustStock}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal Form */}
      <InventoryForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
      />

    </div>
  );
}
