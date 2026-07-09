import React, { useState } from 'react';
import BusinessFilters from '../components/BusinessFilters';
import BusinessTable from '../components/BusinessTable';
import OnboardBusinessModal from '../components/OnboardBusinessModal';
import { useBusinesses } from '../hooks/useBusinesses';

export default function BusinessAccounts() {
  const {
    businesses,
    loading,
    search,
    setSearch,
    toggleStatus,
    deleteBusiness,
    onboardBusiness
  } = useBusinesses();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Business Accounts Directory</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Manage registered storefronts, change active subscriptions, and suspend/activate tenant accounts.</p>
      </div>

      <BusinessFilters 
        search={search} 
        setSearch={setSearch} 
        onOnboard={() => setIsModalOpen(true)} 
      />

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
          Loading businesses...
        </div>
      ) : (
        <BusinessTable 
          businesses={businesses} 
          onToggleStatus={toggleStatus} 
          onDelete={deleteBusiness} 
        />
      )}

      {/* Onboard Business Modal */}
      <OnboardBusinessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onboardBusiness}
      />
    </div>
  );
}
