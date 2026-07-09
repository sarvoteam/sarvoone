import React, { useState } from 'react';

export default function GatewayConfigFields() {
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_90A1B2C3D4E5');
  const [stripeKey, setStripeKey] = useState('pk_live_51P8d7a1F90Ha...');

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Payment gateways integration variables updated.');
  };

  return (
    <form onSubmit={handleUpdate} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '600px' }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#374151', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>Integrate Active Payment Gateways</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Razorpay Key ID (Live mode)</label>
        <input 
          type="text" 
          value={razorpayKey} 
          onChange={(e) => setRazorpayKey(e.target.value)} 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none', fontFamily: 'monospace' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563' }}>Stripe Publishable Key ID</label>
        <input 
          type="text" 
          value={stripeKey} 
          onChange={(e) => setStripeKey(e.target.value)} 
          style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none', fontFamily: 'monospace' }}
        />
      </div>

      <button 
        type="submit" 
        style={{ alignSelf: 'flex-start', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}
      >
        Update Gateways
      </button>
    </form>
  );
}
