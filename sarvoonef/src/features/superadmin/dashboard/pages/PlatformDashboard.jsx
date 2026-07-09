import React, { useState, useEffect } from 'react';
import DashboardStats from '../components/DashboardStats';
import DashboardCharts from '../components/DashboardCharts';
import SystemHealth from '../components/SystemHealth';
import api from '../../../../shared/api/axios';

export default function PlatformDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/superadmin/dashboard')
      .then(res => {
        if (res.data && res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch platform dashboard metrics:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px', color: '#1f2937' }}>
        Platform Analytics & Metrics
      </h2>
      <DashboardStats stats={stats} loading={loading} />
      <DashboardCharts stats={stats} />
      <SystemHealth />
    </div>
  );
}
