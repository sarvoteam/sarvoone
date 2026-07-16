import api from '../../../../shared/api/axios';

/**
 * Fetch all purchase orders
 */
export const fetchPurchasesApi = () => {
  return api.get('/erp/purchases');
};

/**
 * Create a new purchase order
 */
export const createPurchaseApi = (purchaseData) => {
  return api.post('/erp/purchases', purchaseData);
};

/**
 * Fetch all suppliers
 */
export const fetchSuppliersApi = () => {
  return api.get('/erp/suppliers');
};

/**
 * Fetch all products
 */
export const fetchProductsApi = () => {
  return api.get('/erp/products');
};
