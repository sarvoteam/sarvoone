import React, { useState } from 'react';
import PlanCard from '../components/PlanCard';

const initialPlans = [
  { id: 1, name: 'Basic Plan', price: 999, branches: 2, employees: 10, storage: '10 GB', activeStores: 45, isPopular: false },
  { id: 2, name: 'Pro Plan', price: 2499, branches: 5, employees: 50, storage: '50 GB', activeStores: 78, isPopular: true },
  { id: 3, name: 'Enterprise Plan', price: 5999, branches: 'Unlimited', employees: 'Unlimited', storage: '500 GB', activeStores: 19, isPopular: false }
];

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  const handleEditPrice = (plan) => {
    setEditingPlan(plan.id);
    setEditPrice(plan.price);
  };

  const handleSavePrice = (id) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        alert(`Plan "${p.name}" pricing updated to ₹${editPrice}/month`);
        return { ...p, price: Number(editPrice) };
      }
      return p;
    }));
    setEditingPlan(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Subscription Plan Manager</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure limits, prices, and features for tenant packages and monitor live subscription transactions.</p>
      </div>

      <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#374151' }}>Active Platform Tiers</h3>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {plans.map(p => (
          <PlanCard 
            key={p.id}
            plan={p}
            editingPlan={editingPlan}
            editPrice={editPrice}
            setEditPrice={setEditPrice}
            onEdit={handleEditPrice}
            onSave={handleSavePrice}
          />
        ))}
      </section>
    </div>
  );
}
