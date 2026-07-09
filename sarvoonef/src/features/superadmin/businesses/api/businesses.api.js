import api from '../../../../shared/api/axios';

export const getBusinessesApi = () => {
  return api.get('/erp/businesses');
};

export const onboardBusinessApi = (data) => {
  return api.post('/erp/businesses', data);
};

export const deleteBusinessApi = (id) => {
  return api.delete(`/erp/businesses/${id}`);
};
