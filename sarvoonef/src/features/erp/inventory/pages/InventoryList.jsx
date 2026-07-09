import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  Edit, 
  Trash2, 
  AlertCircle,
  Barcode
} from 'lucide-react';
import StockStatusBadge from '../components/StockStatusBadge';
import InventoryForm from '../components/InventoryForm';
import './InventoryList.css';

const initialProducts = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'MED-PC-500', category: 'Medical', stock: 120, reorderLevel: 20, unit: 'box', purchasePrice: 24, sellingPrice: 30, batchNumber: 'BAT-10029', expiryDate: '2027-10-15', damagedStock: 0, warehouseStock: 'Central Warehouse' },
  { id: 2, name: 'Amoxicillin 250mg', sku: 'MED-AMX-250', category: 'Medical', stock: 5, reorderLevel: 15, unit: 'bottle', purchasePrice: 70, sellingPrice: 85, batchNumber: 'BAT-99301', expiryDate: '2026-09-02', damagedStock: 2, warehouseStock: 'Central Warehouse' },
  { id: 3, name: 'Wireless Optical Mouse', sku: 'ELE-WM-04', category: 'Electronics', stock: 45, reorderLevel: 10, unit: 'piece', purchasePrice: 650, sellingPrice: 850, batchNumber: 'BAT-ELE-04', expiryDate: '', damagedStock: 0, warehouseStock: 'City Retail Depot' },
  { id: 4, name: 'LED Bulb 9W Premium', sku: 'HDW-LED-9W', category: 'Hardware', stock: 0, reorderLevel: 15, unit: 'piece', purchasePrice: 90, sellingPrice: 120, batchNumber: 'BAT-HDW-9W', expiryDate: '', damagedStock: 0, warehouseStock: 'City Retail Depot' }
];

export default function InventoryList() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      // Edit mode
      const updatedList = products.map(p => p.id === productData.id ? { ...p, ...productData } : p);
      setProducts(updatedList);
      if (selectedProduct?.id === productData.id) {
        setSelectedProduct({ ...selectedProduct, ...productData });
      }
    } else {
      // Add mode
      setProducts([...products, productData]);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
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

  const handleDelete = (e, productId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item from inventory?')) {
      const filtered = products.filter(p => p.id !== productId);
      setProducts(filtered);
      if (selectedProduct?.id === productId) {
        setSelectedProduct(filtered[0] || null);
      }
    }
  };

  const adjustStock = (productId, amount) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const nextStock = Math.max(0, p.stock + amount);
        const updatedItem = { ...p, stock: nextStock };
        if (selectedProduct?.id === productId) {
          setSelectedProduct(updatedItem);
        }
        return updatedItem;
      }
      return p;
    });
    setProducts(updated);
  };

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-container" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px' }}>
      
      {/* Table Main Panel */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
        <div className="inventory-actions-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div className="actions-left" style={{ display: 'flex', gap: '10px' }}>
            <div className="search-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
              <input 
                type="text" 
                placeholder="Search SKU or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '6px 12px 6px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }}
              />
            </div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff' }}
            >
              <option value="All">All Categories</option>
              <option value="Medical">Medical</option>
              <option value="Electronics">Electronics</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
          
          <button className="btn-primary" onClick={openAddModal} style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
            <Plus size={14} /> Add Stock Item
          </button>
        </div>

        {/* Data Table */}
        <div className="inventory-table-wrapper">
          <table className="inventory-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                <th style={{ padding: '10px' }}>Product</th>
                <th>SKU</th>
                <th>Stock Quantity</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr 
                  key={p.id} 
                  onClick={() => handleRowClick(p)}
                  style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', backgroundColor: selectedProduct?.id === p.id ? '#f9fafb' : 'transparent' }}
                >
                  <td style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.name}</div>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>Category: {p.category}</span>
                  </td>
                  <td>{p.sku}</td>
                  <td style={{ fontWeight: 700, color: p.stock < p.reorderLevel ? '#ef4444' : '#111827' }}>
                    {p.stock} {p.unit}s
                  </td>
                  <td>
                    <StockStatusBadge stock={p.stock} reorderLevel={p.reorderLevel} />
                  </td>
                  <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={(e) => openEditModal(e, p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}><Edit size={14} /></button>
                      <button onClick={(e) => handleDelete(e, p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Item Drawer Panel */}
      {selectedProduct && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>{selectedProduct.name}</h3>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>SKU: {selectedProduct.sku}</span>
          </div>

          {/* Quick Adjustments */}
          <div>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, marginBottom: '6px' }}>Stock Actions</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => adjustStock(selectedProduct.id, 10)} style={{ flex: 1, padding: '6px', fontSize: '11px', fontWeight: 700 }}>
                Stock In (+10)
              </button>
              <button className="btn-secondary" onClick={() => adjustStock(selectedProduct.id, -10)} style={{ flex: 1, padding: '6px', fontSize: '11px', fontWeight: 700 }}>
                Stock Out (-10)
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, marginBottom: '8px' }}>Logistics Parameters</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#4b5563' }}>
              <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '4px' }}>
                <span>Batch Number:</span>
                <strong style={{ fontFamily: 'monospace' }}>{selectedProduct.batchNumber || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '4px' }}>
                <span>Expiry Date:</span>
                <strong style={{ color: '#be185d' }}>{selectedProduct.expiryDate || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '4px' }}>
                <span>Damaged Stock:</span>
                <strong style={{ color: selectedProduct.damagedStock > 0 ? '#ef4444' : '#10b981' }}>{selectedProduct.damagedStock} units</strong>
              </div>
              <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '4px' }}>
                <span>Warehouse Location:</span>
                <strong>{selectedProduct.warehouseStock}</strong>
              </div>
              <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '4px' }}>
                <span>Minimum stock warning limit:</span>
                <strong>{selectedProduct.reorderLevel} units</strong>
              </div>
            </div>
          </div>

          {/* Low Stock Warning simulation preview */}
          {selectedProduct.stock <= selectedProduct.reorderLevel && (
            <div style={{ display: 'flex', gap: '8px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', color: '#991b1b', fontSize: '12px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>Low Stock Alert Triggered!</strong>
                <div style={{ marginTop: '2px' }}>Current stock ({selectedProduct.stock}) has fallen below minimum limit ({selectedProduct.reorderLevel}).</div>
              </div>
            </div>
          )}

          {/* Barcode display */}
          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>Active Barcode lookup</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <Barcode size={32} style={{ color: '#1f2937' }} />
              <span style={{ fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 700 }}>{selectedProduct.sku}</span>
            </div>
          </div>
        </div>
      )}

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
