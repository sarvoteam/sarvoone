import React, { useState } from 'react';
import CouponTable from '../components/CouponTable';
import { Plus } from 'lucide-react';

const initialCoupons = [
  { id: 1, code: 'SARVOFIRST50', discount: '50% off first month', limit: '100 Redeems', used: 42, status: 'Active' },
  { id: 2, code: 'MONSOON20', discount: '20% off all plans', limit: 'Unlimited', used: 128, status: 'Active' },
  { id: 3, code: 'ANNUAL80', discount: '₹8,000 off yearly subscription', limit: '50 Redeems', used: 12, status: 'Active' },
  { id: 4, code: 'BETAOFFER', discount: 'Free Pro plan for 3 months', limit: '20 Redeems', used: 20, status: 'Expired' }
];

export default function SubscriptionCoupons() {
  const [coupons, setCoupons] = useState(initialCoupons);

  const handleToggle = (id) => {
    setCoupons(coupons.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        alert(`Coupon ${c.code} status set to ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleDelete = (id) => {
    if (confirm('Delete this coupon code permanently?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const handleCreate = () => {
    const code = prompt('Enter new coupon code (e.g. SUMMER30):');
    const discount = prompt('Enter discount description (e.g. 30% off for 6 months):');
    if (code) {
      setCoupons([...coupons, {
        id: Date.now(),
        code: code.toUpperCase(),
        discount: discount || 'Custom offer discount',
        limit: 'Unlimited',
        used: 0,
        status: 'Active'
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Subscription Coupons</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Design and dispatch promotional discount codes to drive platform merchant onboarding.</p>
        </div>

        <button 
          onClick={handleCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      <CouponTable coupons={coupons} onToggleStatus={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
