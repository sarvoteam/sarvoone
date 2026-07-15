import { fetchPOSProductsApi, submitSaleApi, fetchSalesOrdersApi } from '../api/salesApi';

/**
 * Fetch all inventory products for POS billing
 */
export const getPOSProducts = async () => {
  try {
    const response = await fetchPOSProductsApi();
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('Service Error - getPOSProducts:', error);
    throw error;
  }
};

/**
 * Create a new sale order (POS transaction)
 */
export const createSale = async (saleData) => {
  try {
    const response = await submitSaleApi(saleData);
    return response.data?.data || response.data;
  } catch (error) {
    console.error('Service Error - createSale:', error);
    throw error;
  }
};

/**
 * Fetch all sales orders / invoices
 */
export const getSalesOrders = async () => {
  try {
    const response = await fetchSalesOrdersApi();
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('Service Error - getSalesOrders:', error);
    throw error;
  }
};
