import api from '../../../../shared/api/axios';

/**
 * Fetch high level metrics summary for dashboard
 */
export const fetchDashboardSummaryApi = () => {
  return api.get('/erp/dashboard');
};
