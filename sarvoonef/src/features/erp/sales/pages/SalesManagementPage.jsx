import React from 'react';
import { Search, Plus, Printer, Loader2, AlertCircle, Eye, X } from 'lucide-react';
import useSalesOrders from '../hooks/useSalesOrders';
import { formatCurrency, formatDateTime } from '../utils/salesFormatter';
import { VIEW_TYPES } from '../constants/salesConstants';

export default function SalesManagementPage() {
  const {
    filteredSales,
    loading,
    error,
    search,
    setSearch,
    viewType,
    setViewType,
    selectedOrder,
    isModalOpen,
    openOrderDetails,
    closeOrderDetails,
    refetchSales
  } = useSalesOrders();

  const getDisplayId = (orderNum, type) => {
    if (type === 'Invoices') return orderNum;
    if (type === 'Quotations') return orderNum.replace('POS', 'QTN').replace('INV', 'QTN');
    return orderNum.replace('POS', 'CHL').replace('INV', 'CHL');
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        fontFamily: 'Inter, system-ui, sans-serif',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Header controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
              Sales Billing Records
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              Manage invoices, quotations and sales transactions.
            </p>
          </div>

          {/* View category tabs */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '3px' }}>
            {VIEW_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setViewType(t)}
                style={{
                  border: 'none',
                  backgroundColor: viewType === t ? '#fff' : 'transparent',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: viewType === t ? '#7c3aed' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar and Create invoice button */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} size={16} />
            <input
              type="text"
              placeholder={`Search ${viewType.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '9px 12px 9px 36px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13px',
                width: '220px',
                outline: 'none',
                backgroundColor: '#f8fafc',
                transition: 'all 0.15s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#c084fc';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            />
          </div>
          <button
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              backgroundColor: '#7c3aed',
              color: '#fff',
              fontWeight: 600,
              transition: 'background-color 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
            onClick={() => alert(`Create new ${viewType.slice(0, -1)} flow...`)}
          >
            <Plus size={16} /> Create {viewType.slice(0, -1)}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#64748b' }}>
            <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
            <span>Fetching sales records...</span>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '12px', color: '#ef4444', textAlign: 'center' }}>
            <AlertCircle size={32} />
            <span style={{ fontWeight: 600 }}>{error}</span>
            <button
              onClick={refetchSales}
              style={{
                padding: '6px 14px',
                backgroundColor: '#7c3aed',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        ) : filteredSales.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13px' }}>
            No sales records found.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600 }}>Document ID</th>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600 }}>Issue Date & Time</th>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600 }}>Invoice Total</th>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 12px', color: '#64748b', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => {
                const displayId = getDisplayId(sale.orderNumber, viewType);
                const customerName = sale.customer?.name || 'Walk-in Customer';
                const issueDate = formatDateTime(sale.createdAt);
                
                const typeLabel = sale.orderType === 'POS' ? 'POS Sale' : 'Manual Invoice';
                const statusLabel = sale.status || 'PAID';
                const totalAmount = sale.totalAmount || 0;

                return (
                  <tr
                    key={sale.id}
                    style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s' }}
                    className="table-row-hover"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '14px 12px', fontWeight: 700, color: '#0f172a' }}>
                      {displayId}
                    </td>
                    <td style={{ padding: '14px 12px', fontWeight: 600, color: '#334155' }}>
                      {customerName}
                    </td>
                    <td style={{ padding: '14px 12px', color: '#475569' }}>
                      {issueDate}
                    </td>
                    <td style={{ padding: '14px 12px', color: '#475569' }}>
                      {typeLabel}
                    </td>
                    <td style={{ padding: '14px 12px', fontWeight: 700, color: '#7c3aed' }}>
                      {formatCurrency(totalAmount)}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: statusLabel.toUpperCase() === 'PAID' ? '#d1fae5' : '#fef3c7',
                          color: statusLabel.toUpperCase() === 'PAID' ? '#065f46' : '#92400e',
                          textTransform: 'capitalize'
                        }}
                      >
                        {statusLabel.toLowerCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openOrderDetails(sale)}
                          style={{
                            background: '#f1f5f9',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f5f3ff';
                            e.currentTarget.style.color = '#7c3aed';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.color = '#64748b';
                          }}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => alert(`Printing receipt for ${displayId}...`)}
                          style={{
                            background: '#f1f5f9',
                            border: 'none',
                            color: '#64748b',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f5f3ff';
                            e.currentTarget.style.color = '#7c3aed';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.color = '#64748b';
                          }}
                          title="Print Document"
                        >
                          <Printer size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Invoice Items Viewer Modal */}
      {isModalOpen && selectedOrder && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '550px',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative'
            }}
          >
            <button
              onClick={closeOrderDetails}
              style={{
                position: 'absolute',
                right: '16px',
                top: '16px',
                background: '#f8fafc',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: '6px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
            >
              <X size={16} />
            </button>

            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              Invoice Details
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#64748b' }}>
              Order ID: <span style={{ fontWeight: 600, color: '#0f172a' }}>{getDisplayId(selectedOrder.orderNumber, viewType)}</span>
            </p>

            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px 16px',
                fontSize: '13px',
                marginBottom: '20px'
              }}
            >
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Customer</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedOrder.customer?.name || 'Walk-in Customer'}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Date & Time</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{formatDateTime(selectedOrder.createdAt)}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Transaction Type</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedOrder.orderType === 'POS' ? 'POS Terminal Sale' : 'Manual Order'}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Status</span>
                <span
                  style={{
                    display: 'inline-block',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: selectedOrder.status.toUpperCase() === 'PAID' ? '#065f46' : '#92400e'
                  }}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700, color: '#334155' }}>
              Items Purchased
            </h4>

            {/* List items */}
            <div
              style={{
                border: '1px solid #f1f5f9',
                borderRadius: '12px',
                maxHeight: '160px',
                overflowY: 'auto',
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px'
              }}
            >
              {selectedOrder.items && selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    padding: '4px 0',
                    borderBottom: index < selectedOrder.items.length - 1 ? '1px solid #f1f5f9' : 'none'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: '#334155' }}>{item.product?.name || 'Product'}</span>
                    <span style={{ color: '#64748b', marginLeft: '6px' }}>x {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#475569' }}>
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Summary */}
            <div
              style={{
                borderTop: '1px solid #f1f5f9',
                paddingTop: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '13px',
                color: '#475569'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>{formatCurrency(selectedOrder.totalAmount - (selectedOrder.taxAmount || 0))}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (18%)</span>
                <span>{formatCurrency(Number(selectedOrder.taxAmount || 0))}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#0f172a',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '8px',
                  marginTop: '4px'
                }}
              >
                <span>Total Amount</span>
                <span style={{ color: '#7c3aed' }}>{formatCurrency(Number(selectedOrder.totalAmount || 0))}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
