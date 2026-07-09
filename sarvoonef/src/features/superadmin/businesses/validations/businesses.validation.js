export const validateOnboardInputs = (payload) => {
  const errors = [];
  const { name, category, ownerName, phone, email, state, city, address, plan } = payload;
  
  if (!name || name.trim().length === 0) {
    errors.push('Business Name is required');
  }
  if (!category || category.trim().length === 0) {
    errors.push('Business Category is required');
  }
  if (!ownerName || ownerName.trim().length === 0) {
    errors.push('Owner Name is required');
  }
  if (!phone || phone.trim().length === 0) {
    errors.push('Mobile Number is required');
  } else if (!/^\+?[0-9\s-]{8,15}$/.test(phone.trim())) {
    errors.push('Mobile Number format is invalid (should be between 8 and 15 digits)');
  }
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push('Email format is invalid');
  }
  if (!state || state.trim().length === 0) {
    errors.push('State is required');
  }
  if (!city || city.trim().length === 0) {
    errors.push('City is required');
  }
  if (!address || address.trim().length === 0) {
    errors.push('Business Address is required');
  }
  if (!plan || plan.trim().length === 0) {
    errors.push('Subscription Plan is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
