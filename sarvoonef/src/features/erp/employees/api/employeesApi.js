import api from '../../../../shared/api/axios';

/**
 * Fetch all employees from backend
 */
export const fetchEmployeesApi = () => {
  return api.get('/erp/employees');
};

/**
 * Onboard a new employee
 */
export const createEmployeeApi = (employeeData) => {
  return api.post('/erp/employees', employeeData);
};

/**
 * Record a payment transaction (e.g. salary payment)
 */
export const createPaymentApi = (paymentData) => {
  return api.post('/erp/payments', paymentData);
};

