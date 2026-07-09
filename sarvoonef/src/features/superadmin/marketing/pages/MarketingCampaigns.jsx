import React, { useState } from 'react';
import CampaignTable from '../components/CampaignTable';
import { Plus } from 'lucide-react';

const initialCampaigns = [
  { id: 1, name: 'July Merchant Promotion Kickoff', promoCode: 'JULYOFF50', subject: 'Unlock 50% discount on your next monthly POS bill!', recipients: 250, ctr: 4.8, status: 'Sent' },
  { id: 2, name: 'Abandoned Checkout Recovery Blast', promoCode: 'RECLAIM20', subject: 'Complete your store setup today and save 20%', recipients: 120, ctr: 8.2, status: 'Sent' },
  { id: 3, name: 'Annual Pro Subscription Upgrade push', promoCode: 'YEARLONG80', subject: 'Switch to Yearly plan and save ₹8,000 instantly!', recipients: 0, ctr: 0, status: 'Draft' }
];

export default function MarketingCampaigns() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const handleTrigger = (id, name) => {
    alert(`Triggering email marketing broadcast for: ${name}`);
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Sent', recipients: 320, ctr: 1.2 } : c));
  };

  const handleAdd = () => {
    const name = prompt('Enter campaign name:');
    const promoCode = prompt('Enter promo code associated (optional):');
    const subject = prompt('Enter email subject:');
    if (name) {
      setCampaigns([...campaigns, {
        id: Date.now(),
        name,
        promoCode: promoCode || 'None',
        subject: subject || 'No subject',
        recipients: 0,
        ctr: 0,
        status: 'Draft'
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Marketing Email Campaigns</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Compose, schedule, and evaluate promotional email broadcasts to boost merchant conversion.</p>
        </div>

        <button 
          onClick={handleAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <CampaignTable campaigns={campaigns} onTriggerCampaign={handleTrigger} />
    </div>
  );
}
