import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { 
  fetchPurchasesApi, 
  fetchSuppliersApi, 
  fetchProductsApi 
} from '../api/purchasesApi';
import CreatePurchaseModal from '../components/CreatePurchaseModal';
import PurchaseTable from '../components/PurchaseTable';

export default function PurchaseManagement() {
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch initial data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [purchasesRes, suppliersRes, productsRes] = await Promise.all([
        fetchPurchasesApi(),
        fetchSuppliersApi(),
        fetchProductsApi()
      ]);
      
      if (purchasesRes.data && purchasesRes.data.success) {
        setPurchases(purchasesRes.data.data);
      }
      if (suppliersRes.data && suppliersRes.data.success) {
        setSuppliers(suppliersRes.data.data);
      }
      if (productsRes.data && productsRes.data.success) {
        setProducts(productsRes.data.data);
      }
    } catch (err) {
      console.error('Error loading purchase management data:', err);
      setError('Failed to fetch records from backend. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtering
  const filtered = purchases.filter(p => {
    const supplierName = p.supplier?.name || '';
    const poNumber = p.orderNumber || '';
    return supplierName.toLowerCase().includes(search.toLowerCase()) || 
           poNumber.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '520px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px -2px rgba(49, 16, 132, 0.04), 0 2px 8px -1px rgba(49, 16, 132, 0.02)' }}>
      {/* Top Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Purchase Orders & Invoices</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#64748b' }}>Track, receive, and manage procurement orders with partner suppliers.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} size={16} />
            <input 
              type="text" 
              placeholder="Search purchases..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '9px 12px 9px 36px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', width: '220px', outline: 'none', transition: 'border-color 0.15s ease', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary" 
            style={{ padding: '9px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Create Purchase Order
          </button>
        </div>
      </div>

      {/* Main content table / loaders */}
      <PurchaseTable 
        purchases={filtered}
        loading={loading}
        error={error}
        onReload={loadData}
      />

      {/* Create Purchase Order Modal */}
      <CreatePurchaseModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        suppliers={suppliers}
        products={products}
        onSuccess={loadData}
      />
    </div>
  );
}
