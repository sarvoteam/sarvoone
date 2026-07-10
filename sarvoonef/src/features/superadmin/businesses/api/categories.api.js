import api from '../../../../shared/api/axios';

export const getCategoriesApi = () => {
  return api.get('/superadmin/categories');
};

export const createCategoryApi = (data) => {
  return api.post('/superadmin/categories', data);
};

export const updateCategoryApi = (id, data) => {
  return api.put(`/superadmin/categories/${id}`, data);
};

export const deleteCategoryApi = (id) => {
  return api.delete(`/superadmin/categories/${id}`);
};
