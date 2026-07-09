import api from '../../../../shared/api/axios';

export const getBranchesApi = () => {
  return api.get('/erp/branches');
};

export const createBranchApi = (data) => {
  return api.post('/erp/branches', data);
};

export const toggleBranchStatusApi = (id, data) => {
  return api.put(`/erp/branches/${id}`, data);
};
