import React, { useState } from 'react';
import PaymentHistoryTable from '../components/PaymentHistoryTable';
import { ListFilter } from 'lucide-react';

const initialTransactions = [
  { id: 'TXN-9021', business: 'Sarvo Medical & General Store', plan: 'Pro Plan', amount: 2499, date: '2026-07-09', method: 'Razorpay', status: 'Success' },
  { id: 'TXN-9020', business: 'TechHub Devices & Wholesalers', plan: 'Enterprise Plan', amount: 5999, date: '2026-07-08', method: 'Razorpay', status: 'Success' },
  { id: 'TXN-9019', business: 'Vogue Boutique Apparel', plan: 'Basic Plan', amount: 999, date: '2026-07-07', method: 'Stripe', status: 'Success' },
  { id: 'TXN-9018', business: 'Anastasia Grocery Outlet', plan: 'Basic Plan', amount: 999, date: '2026-07-06', method: 'UPI', status: 'Failed' },
  { id: 'TXN-9017', business: 'Sovereign Wellness & Pharma', plan: 'Pro Plan', amount: 2499, date: '2026-07-05', method: 'Razorpay', status: 'Success' }
];

export default function SubscriptionPayments() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const handleFilter = () => {
    alert('Filtering payment logs...');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Platform Payments History</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Monitor payments, transaction statuses, billing methods, and gate levels.</p>
        </div>

        <button 
          onClick={handleFilter}
          style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', borderRadius: '6px', fontSize: '12px', color: '#4b5563', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          <ListFilter size={14} /> Filter Logs
        </button>
      </div>

      <PaymentHistoryTable transactions={transactions} />
    </div>
  );
}
