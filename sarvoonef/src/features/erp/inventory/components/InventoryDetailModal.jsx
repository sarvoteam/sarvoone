import React, { useState } from 'react';
import { 
  X, 
  AlertCircle, 
  Barcode, 
  Package, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Tag, 
  Layers, 
  Trash2, 
  Edit,
  TrendingUp,
  Activity,
  Plus,
  Minus
} from 'lucide-react';
import StockStatusBadge from './StockStatusBadge';

export default function InventoryDetailModal({ 
  isOpen, 
  onClose, 
  product, 
  onAdjustStock,
  onEdit,
  onDelete
}) {
  const [adjustmentAmount, setAdjustmentAmount] = useState('');

  if (!isOpen || !product) return null;

  const handleCustomAdjustment = (isStockIn) => {
    const amt = parseInt(adjustmentAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid positive number for stock adjustment.');
      return;
    }
    onAdjustStock(product, isStockIn ? amt : -amt);
    setAdjustmentAmount('');
  };

  const isLowStock = (product.stock || 0) <= (product.reorderLevel || 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '90%',
        maxWidth: '680px',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        padding: '30px',
        boxSizing: 'border-box',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #f1f5f9'
      }}>
        
        {/* Header Section */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '20px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ 
                fontSize: '11px', 
                backgroundColor: '#eff6ff', 
                color: '#1d4ed8', 
                fontWeight: 700, 
                padding: '2px 8px', 
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                {product.category || 'General'}
              </span>
              {product.brand && (
                <span style={{ 
                  fontSize: '11px', 
                  backgroundColor: '#f8fafc', 
                  color: '#475569', 
                  fontWeight: 600, 
                  padding: '2px 8px', 
                  borderRadius: '6px'
                }}>
                  Brand: {product.brand}
                </span>
              )}
            </div>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: '1.2' }}>
              {product.name}
            </h3>
            <span style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px', display: 'block' }}>
              SKU Code: <strong style={{ color: '#334155' }}>{product.sku}</strong>
            </span>
          </div>
          
          <button 
            onClick={onClose}
            style={{
              background: '#f8fafc',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Alerts Banner */}
        {isLowStock && (
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca', 
            padding: '16px', 
            borderRadius: '12px', 
            color: '#991b1b', 
            fontSize: '13px', 
            marginBottom: '24px' 
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontWeight: 700 }}>Low Stock Alert Triggered!</strong>
              <div style={{ marginTop: '2px', opacity: 0.9 }}>
                Current stock ({product.stock} {product.unit || 'unit'}s) has fallen below the safety limit of {product.reorderLevel || 0} {product.unit || 'unit'}s. Please reorder stock immediately.
              </div>
            </div>
          </div>
        )}

        {/* Detail Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          
          {/* Stock Metrics Card */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            border: '1px solid #e2e8f0', 
            borderRadius: '16px', 
            padding: '20px' 
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
              <Package size={15} style={{ color: '#7c3aed' }} /> Stock Levels
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Current Stock:</span>
                <strong style={{ fontSize: '15px', color: isLowStock ? '#ef4444' : '#0f172a' }}>
                  {product.stock} {product.unit || 'unit'}s
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Safety Reorder Level:</span>
                <strong style={{ color: '#334155' }}>{product.reorderLevel || 0} {product.unit || 'unit'}s</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Damaged Stock Count:</span>
                <strong style={{ color: product.damagedStock > 0 ? '#ef4444' : '#10b981' }}>
                  {product.damagedStock || 0} {product.unit || 'unit'}s
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Status Indicator:</span>
                <StockStatusBadge stock={product.stock} reorderLevel={product.reorderLevel} />
              </div>
            </div>
          </div>

          {/* Logistics Parameters Card */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            border: '1px solid #e2e8f0', 
            borderRadius: '16px', 
            padding: '20px' 
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
              <Layers size={15} style={{ color: '#7c3aed' }} /> Logistics Details
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Batch Number:</span>
                <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{product.batchNumber || 'N/A'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Expiry Date:</span>
                <strong style={{ color: product.expiryDate ? '#b91c1c' : '#64748b' }}>
                  {product.expiryDate || 'N/A'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Warehouse Depot:</span>
                <strong style={{ color: '#334155' }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {product.warehouseStock || 'Central Warehouse'}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569', fontSize: '13.5px' }}>Barcode ID:</span>
                <strong style={{ fontFamily: 'monospace', color: '#334155' }}>{product.barcode || 'N/A'}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Pricing Info & Barcode Visualizer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginBottom: '24px' }}>
          
          {/* Pricing Info */}
          <div style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '16px', 
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
              <DollarSign size={15} style={{ color: '#7c3aed' }} /> Pricing & Valuation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Purchase Rate</div>
                <strong style={{ fontSize: '16px', color: '#0f172a' }}>₹{(product.purchasePrice || 0).toLocaleString()}</strong>
              </div>
              <div style={{ backgroundColor: '#f5f3ff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #ede9fe' }}>
                <div style={{ fontSize: '11px', color: '#7c3aed' }}>Selling Rate</div>
                <strong style={{ fontSize: '16px', color: '#7c3aed' }}>₹{(product.sellingPrice || 0).toLocaleString()}</strong>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div style={{ backgroundColor: '#f0fdf4', padding: '8px 14px', borderRadius: '10px', border: '1px solid #dcfce7' }}>
                <div style={{ fontSize: '10px', color: '#16a34a' }}>Wholesale Rate</div>
                <strong style={{ fontSize: '14.5px', color: '#16a34a' }}>
                  {product.wholesalePrice > 0 ? `₹${(product.wholesalePrice).toLocaleString()}` : 'N/A'}
                </strong>
              </div>
              <div style={{ backgroundColor: '#faf5ff', padding: '8px 14px', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                <div style={{ fontSize: '10px', color: '#9333ea' }}>MRP Rate</div>
                <strong style={{ fontSize: '14.5px', color: '#9333ea' }}>₹{(product.mrp || 0).toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Barcode representation */}
          <div style={{ 
            border: '1px dashed #cbd5e1', 
            borderRadius: '16px', 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#fafbfc'
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Product Barcode
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <Barcode size={44} style={{ color: '#0f172a' }} />
              <span style={{ fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 700, color: '#475569' }}>
                {product.barcode || product.sku}
              </span>
            </div>
          </div>

        </div>

        {/* Real-time Inventory Stock Adjustments */}
        <div style={{ 
          border: '1px solid #7c3aed', 
          backgroundColor: '#faf5ff',
          borderRadius: '16px', 
          padding: '20px',
          marginBottom: '28px'
        }}>
          <h4 style={{ margin: '0 0 14px 0', fontSize: '13px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
            <Activity size={15} /> Quick Inventory Stock Adjustment
          </h4>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
              <button 
                onClick={() => onAdjustStock(product, 10)} 
                className="btn-secondary" 
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #ddd6fe',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} /> Stock In (+10)
              </button>
              
              <button 
                onClick={() => onAdjustStock(product, -10)} 
                className="btn-secondary" 
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #ddd6fe',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Minus size={14} /> Stock Out (-10)
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', flex: '1.2', minWidth: '220px' }}>
              <input 
                type="number"
                placeholder="Custom quantity..."
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #ddd6fe',
                  borderRadius: '10px',
                  outline: 'none'
                }}
              />
              <button 
                onClick={() => handleCustomAdjustment(true)}
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
              <button 
                onClick={() => handleCustomAdjustment(false)}
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Reduce
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          borderTop: '1px solid #f1f5f9', 
          paddingTop: '20px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={(e) => {
                onEdit(e, product);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Edit size={14} /> Edit Ledger Details
            </button>
            
            <button 
              onClick={(e) => {
                onDelete(e, product.id);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                border: '1px solid #fecaca',
                backgroundColor: '#fef2f2',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#dc2626',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Trash2 size={14} /> Remove Item
            </button>
          </div>

          <button 
            onClick={onClose}
            style={{
              padding: '10px 24px',
              border: 'none',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
