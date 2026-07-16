import api from '../../../../shared/api/axios';

/**
 * Fetch all ERP branches from backend
 */
export const fetchBranchesApi = () => {
  return api.get('/erp/branches');
};

/**
 * Register a new branch under ERP
 */
export const createBranchApi = (branchData) => {
  return api.post('/erp/branches', branchData);
};
