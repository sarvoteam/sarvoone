import { fetchDashboardSummaryApi } from '../api/dashboardApi';

/**
 * Get dashboard metrics summary
 */
export const getDashboardSummary = async () => {
  try {
    const response = await fetchDashboardSummaryApi();
    return response.data?.data || response.data;
  } catch (error) {
    console.error('Service Error - getDashboardSummary:', error);
    throw error;
  }
};
