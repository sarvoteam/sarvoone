import { emailToOwnerName, detectBusinessCategory } from '../utils/businesses.utils';

export const transformBusinessRow = (item, statusMap = {}) => {
  return {
    id: item.id,
    name: item.name,
    owner: item.ownerName || emailToOwnerName(item.email),
    email: item.email || 'no-email@sarvo.one',
    category: item.category || detectBusinessCategory(item.name),
    branches: item._count?.branches || 0,
    plan: item.plan || 'Pro Plan',
    status: statusMap[item.id] || 'Active'
  };
};

export const transformBusinessList = (list = [], statusMap = {}) => {
  return list.map(item => transformBusinessRow(item, statusMap));
};
