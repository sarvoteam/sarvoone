export const transformBranchRow = (item, statusMap = {}) => {
  return {
    id: item.id,
    businessName: item.business?.name || 'Sarvo Medical',
    branchName: item.name || 'Connaught Place Main',
    location: item.address || 'New Delhi, DL',
    staffCount: 8, 
    monthlySales: 185000, 
    status: statusMap[item.id] || 'Active'
  };
};

export const transformBranchList = (list = [], statusMap = {}) => {
  return list.map(item => transformBranchRow(item, statusMap));
};
