import api from '../../../../shared/api/axios';

/**
 * Fetch all inventory products for POS billing
 */
export const fetchPOSProductsApi = () => {
  return api.get('/erp/products');
};

/**
 * Create a new sale order (POS transaction)
 */
export const submitSaleApi = (saleData) => {
  return api.post('/erp/sales', saleData);
};

/**
 * Fetch all sales orders / invoices
 */
export const fetchSalesOrdersApi = () => {
  return api.get('/erp/sales');
};
