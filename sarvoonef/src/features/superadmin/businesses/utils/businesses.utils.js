export const emailToOwnerName = (email) => {
  if (!email) return 'Emily Lynch';
  return email
    .split('@')[0]
    .split('.')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
};

export const detectBusinessCategory = (name = '') => {
  const normalized = name.toLowerCase();
  if (normalized.includes('medical') || normalized.includes('pharma')) {
    return 'Medical Store';
  }
  if (normalized.includes('apparel') || normalized.includes('boutique') || normalized.includes('fashion')) {
    return 'Clothing & Apparel';
  }
  if (normalized.includes('tech') || normalized.includes('device') || normalized.includes('electronics')) {
    return 'Electronics Wholesale';
  }
  return 'General Retail';
};
