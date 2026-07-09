import React from 'react';
import { Star, Edit, Check } from 'lucide-react';

export default function PlanCard({ plan, editingPlan, editPrice, setEditPrice, onEdit, onSave }) {
  const isEditing = editingPlan === plan.id;

  return (
    <div 
      style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        border: plan.isPopular ? '2px solid #7c3aed' : '1px solid #e5e7eb', 
        padding: '24px',
        position: 'relative',
        boxShadow: plan.isPopular ? '0 10px 15px -3px rgba(124, 58, 237, 0.1)' : 'none'
      }}
    >
      {plan.isPopular && (
        <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: '#7c3aed', color: '#fff', padding: '2px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Star size={10} fill="#fff" /> Most Popular
        </span>
      )}

      <div style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}>{plan.name}</div>
      
      {isEditing ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <span style={{ fontSize: '24px', fontWeight: 700 }}>₹</span>
          <input 
            type="number" 
            value={editPrice} 
            onChange={(e) => setEditPrice(e.target.value)} 
            style={{ width: '100px', padding: '6px', fontSize: '18px', fontWeight: 'bold', border: '1px solid #7c3aed', borderRadius: '6px', outline: 'none' }}
          />
          <button 
            onClick={() => onSave(plan.id)}
            style={{ backgroundColor: '#10b981', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Check size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px', fontWeight: 800, color: '#1f2937' }}>₹{plan.price.toLocaleString()}</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>/ month</span>
          <button 
            onClick={() => onEdit(plan)}
            style={{ border: 'none', background: 'none', padding: '4px', color: '#9ca3af', cursor: 'pointer', marginLeft: '8px' }}
          >
            <Edit size={14} />
          </button>
        </div>
      )}

      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#4b5563', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Max Branches:</span>
          <strong style={{ color: '#1f2937' }}>{plan.branches}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Max Employees:</span>
          <strong style={{ color: '#1f2937' }}>{plan.employees}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Shared Storage:</span>
          <strong style={{ color: '#1f2937' }}>{plan.storage}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dotted #f3f4f6', paddingTop: '8px' }}>
          <span>Active Storefronts:</span>
          <strong style={{ color: '#7c3aed' }}>{plan.activeStores} users</strong>
        </div>
      </div>
    </div>
  );
}
