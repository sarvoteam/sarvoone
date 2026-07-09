import React, { useState } from 'react';
import JobQueueTable from '../components/JobQueueTable';

const initialJobs = [
  { id: 1, name: 'Invoice PDF Generator', queue: 'billing-queue', frequency: 'Daily at 00:00', lastRun: '2026-07-09 00:00:02', status: 'Idle' },
  { id: 2, name: 'Daily Revenue Sync', queue: 'reporting-queue', frequency: 'Hourly', lastRun: '2026-07-09 13:00:00', status: 'Running' },
  { id: 3, name: 'Unpaid Session Cleanup', queue: 'security-queue', frequency: 'Every 30 mins', lastRun: '2026-07-09 13:30:00', status: 'Idle' }
];

export default function MonitoringBackgroundJobs() {
  const [jobs, setJobs] = useState(initialJobs);

  const handleTrigger = (id, name) => {
    alert(`Manually triggered job worker: "${name}"`);
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'Running', lastRun: 'Just now' } : j));
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Idle' } : j));
    }, 2000);
  };

  const handleCancel = (id, name) => {
    if (confirm(`Cancel scheduled background queue instance for: ${name}?`)) {
      alert(`Job worker "${name}" cancelled.`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Cron Background Jobs</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Monitor scheduled backend workers, trigger queue tasks manually, and review process frequencies.</p>
      </div>

      <JobQueueTable jobs={jobs} onTrigger={handleTrigger} onCancel={handleCancel} />
    </div>
  );
}
