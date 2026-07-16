import React, { useState, useEffect } from 'react';
import { X, Loader2, Check } from 'lucide-react';
import { createPaymentApi } from '../api/employeesApi';

export default function RecordPaymentModal({ isOpen, onClose, employee, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form Fields
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [date, setDate] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen && employee) {
      setAmount(employee.salary || '');
      setMethod('UPI');
      // Format today's date as YYYY-MM-DD
      const today = new Date().toISOString().slice(0, 10);
      setDate(today);
      setReferenceNumber('');
      setNotes(`Salary Payment for ${employee.name}`);
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen, employee]);

  if (!isOpen || !employee) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !method || !date) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const payload = {
        type: 'PAYMENT', // standard payments table type
        method: method,
        amount: Number(amount),
        referenceNumber: referenceNumber || null,
        createdAt: new Date(date).toISOString() // using custom date
      };

      const response = await createPaymentApi(payload);

      if (response.data && response.data.success) {
        setSuccessMsg('Payment transaction stored successfully!');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1500);
      } else {
        setError('Failed to record transaction.');
      }
    } catch (err) {
      console.error('Error recording payment:', err);
      setError(err.response?.data?.message || 'Error saving payment to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '480px', borderRadius: '16px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', boxSizing: 'border-box', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Record Salary Payment</h3>
          <button 
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '10px 12px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', color: '#b91c1c', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
            {error}
          </div>
        )}

        {successMsg && (
          <div style={{ padding: '10px 12px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#047857', fontSize: '13px', marginBottom: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Employee display */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Employee</label>
            <div style={{ padding: '10px 12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
              {employee.name} <span style={{ fontWeight: 500, color: '#64748b', fontSize: '12px', marginLeft: '6px' }}>({employee.role})</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Amount */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Amount Paid (₹) *</label>
              <input 
                type="number" 
                required
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>

            {/* Date */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Payment Date *</label>
              <input 
                type="date" 
                required
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Method */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Payment Method *</label>
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer', boxSizing: 'border-box' }} 
              >
                <option value="UPI">UPI</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
              </select>
            </div>

            {/* Ref Number */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Reference / Txn ID</label>
              <input 
                type="text" 
                placeholder="e.g. TXN10293847"
                value={referenceNumber} 
                onChange={(e) => setReferenceNumber(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Notes / Remarks</label>
            <textarea 
              rows={2}
              placeholder="Add optional payment details..."
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'none' }} 
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#475569' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary"
              style={{ flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Saving...
                </>
              ) : (
                'Save Transaction'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
