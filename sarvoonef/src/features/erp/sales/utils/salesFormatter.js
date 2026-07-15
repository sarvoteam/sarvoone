/**
 * Formats a number to Indian Rupee (INR) currency display
 */
export const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toFixed(2)}`;
};

/**
 * Formats a ISO date string to a localized Date string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Formats a ISO date string to a localized Date & Time string
 */
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Generates a unique simulated order number
 */
export const generateOrderNumber = () => {
  return 'POS-' + Math.floor(100000 + Math.random() * 900000);
};
