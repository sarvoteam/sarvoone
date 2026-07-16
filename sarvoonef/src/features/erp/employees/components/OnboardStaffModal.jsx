import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createEmployeeApi } from '../api/employeesApi';

export default function OnboardStaffModal({ isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setRole('');
      setSalary('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !role || !salary) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name,
        role,
        salary: Number(salary),
        email: email || null,
        phone: phone || null
      };

      const response = await createEmployeeApi(payload);

      if (response.data && response.data.success) {
        onSuccess();
        onClose();
      } else {
        setError('Failed to onboard staff member.');
      }
    } catch (err) {
      console.error('Error onboarding staff:', err);
      setError(err.response?.data?.message || 'Error saving staff member to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '520px', borderRadius: '16px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Onboard Staff Member</h3>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Basic Info */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Full Name *</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Role / Designation *</label>
              <input 
                type="text" 
                placeholder="e.g. Manager"
                required 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Monthly Basic Salary (₹) *</label>
              <input 
                type="number" 
                placeholder="e.g. 5000"
                required 
                value={salary} 
                onChange={(e) => setSalary(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. email@domain.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Phone Number</label>
              <input 
                type="tel" 
                placeholder="e.g. 9876543210"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
            <button 
              type="button" 
              onClick={onClose}
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
                'Onboard Staff'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
