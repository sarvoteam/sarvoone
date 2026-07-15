/**
 * Check if the quantity being added exceeds available stock
 */
export const validateCartStock = (currentQtyInCart, productStock) => {
  return currentQtyInCart < productStock;
};

/**
 * Validate POS checkout parameters
 */
export const validateSalePayload = (payload) => {
  if (!payload.orderNumber) {
    return { isValid: false, message: 'Order number is missing.' };
  }
  if (!payload.items || payload.items.length === 0) {
    return { isValid: false, message: 'Your shopping cart is empty!' };
  }
  
  // Verify positive quantities
  for (const item of payload.items) {
    if (!item.productId) {
      return { isValid: false, message: 'Product reference is missing.' };
    }
    if (Number(item.quantity) <= 0) {
      return { isValid: false, message: `Invalid quantity specified for product ID ${item.productId}.` };
    }
  }

  return { isValid: true };
};
