import api from '../../../../shared/api/axios';

export const getCategoriesApi = () => {
  return api.get('/erp/categories');
};

export const createCategoryApi = (data) => {
  return api.post('/erp/categories', data);
};

export const updateCategoryApi = (id, data) => {
  return api.put(`/erp/categories/${id}`, data);
};

export const deleteCategoryApi = (id) => {
  return api.delete(`/erp/categories/${id}`);
};
