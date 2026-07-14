import api from '../../../../shared/api/axios';

/**
 * Fetch all inventory items (products) from the backend
 */
export const getInventoryProducts = () => {
  return api.get('/erp/products');
};

/**
 * Create a new inventory product
 */
export const createInventoryProduct = (productData) => {
  return api.post('/erp/products', productData);
};

/**
 * Update an existing inventory product
 */
export const updateInventoryProduct = (id, productData) => {
  return api.put(`/erp/products/${id}`, productData);
};

/**
 * Delete an inventory product
 */
export const deleteInventoryProduct = (id) => {
  return api.delete(`/erp/products/${id}`);
};
