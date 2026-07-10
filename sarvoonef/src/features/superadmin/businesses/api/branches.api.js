import api from '../../../../shared/api/axios';

export const getBranchesApi = () => {
  return api.get('/superadmin/branches');
};

export const createBranchApi = (data) => {
  return api.post('/superadmin/branches', data);
};

export const toggleBranchStatusApi = (id, data) => {
  return api.put(`/superadmin/branches/${id}`, data);
};
