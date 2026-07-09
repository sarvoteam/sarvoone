import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getCategoriesApi } from '../api/categories.api';
import { validateOnboardInputs } from '../validations/businesses.validation';

const DEFAULT_CATEGORIES = [
  'Medical & Pharmacy',
  'Clothing & Apparel',
  'Supermarket & Grocery',
  'Electronics & Mobiles',
  'Restaurant & Cafe',
  'General Retail'
];

const PLAN_OPTIONS = [
  'Basic Plan',
  'Pro Plan',
  'Enterprise Plan'
];

export default function OnboardBusinessModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [plan, setPlan] = useState('Pro Plan');

  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch db categories on mount
  useEffect(() => {
    if (isOpen) {
      getCategoriesApi()
        .then((res) => {
          if (res.data && res.data.success && res.data.data.length > 0) {
            const dbCategories = res.data.data.map(cat => cat.name);
            // Merge defaults and db categories uniquely
            setCategoriesList(Array.from(new Set([...dbCategories, ...DEFAULT_CATEGORIES])));
            setCategory(dbCategories[0] || DEFAULT_CATEGORIES[0]);
          } else {
            setCategory(DEFAULT_CATEGORIES[0]);
          }
        })
        .catch(() => {
          setCategory(DEFAULT_CATEGORIES[0]);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      name,
      category,
      ownerName,
      phone,
      email,
      state,
      city,
      address,
      plan
    };

    const validation = validateOnboardInputs(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    onSubmit(payload)
      .then(() => {
        // Reset form
        setName('');
        setCategory(categoriesList[0] || '');
        setOwnerName('');
        setPhone('');
        setEmail('');
        setState('');
        setCity('');
        setAddress('');
        setPlan('Pro Plan');
        setErrors([]);
        onClose();
      })
      .catch((err) => {
        setErrors([err.message || 'Failed to onboard business account.']);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out'
    }} onClick={onClose}>
      
      {/* Modal Container */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '650px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            Onboard New Business Storefront
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {errors.length > 0 && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              borderRadius: '8px',
              color: '#b91c1c',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {errors.map((err, i) => (
                <span key={i}>• {err}</span>
              ))}
            </div>
          )}

          {/* 2-Column Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px 20px'
          }}>
            
            {/* Business Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Business Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="e.g. Sarvo Pharmacy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitting}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Business Category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Business Category <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={submitting}
                required
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                {categoriesList.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Owner Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Owner Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="e.g. Om Kolekar"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
                disabled={submitting}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Mobile Number */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Mobile Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={submitting}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Owner Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Owner Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="email"
                placeholder="e.g. owner@sarvopharmacy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Subscription Plan */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Subscription Plan <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                disabled={submitting}
                required
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              >
                {PLAN_OPTIONS.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* State */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                State <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="e.g. Maharashtra"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                disabled={submitting}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* City */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                City <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="e.g. Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                disabled={submitting}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Business Address (Full width) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>
                Business Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea 
                placeholder="e.g. Shop no. 12, Phoenix Marketcity, LBS Road, Kurla West"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                disabled={submitting}
                rows={2}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '8px',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '16px'
          }}>
            <button 
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={submitting}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#7c3aed',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: submitting ? 0.7 : 1
              }}
            >
              {submitting ? 'Onboarding...' : 'Onboard Store'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
