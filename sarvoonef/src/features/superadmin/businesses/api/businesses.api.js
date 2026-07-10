import api from '../../../../shared/api/axios';

export const getBusinessesApi = () => {
  return api.get('/superadmin/businesses');
};

export const onboardBusinessApi = (data) => {
  return api.post('/superadmin/businesses', data);
};

export const deleteBusinessApi = (id) => {
  return api.delete(`/superadmin/businesses/${id}`);
};
