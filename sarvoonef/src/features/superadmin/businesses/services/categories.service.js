export const transformCategoryRow = (item) => {
  return {
    id: item.id,
    name: item.name || 'Medical Store',
    description: item.description || 'Pharmacies, dispensaries, healthcare equipment shops.',
    storeCount: item._count?.businesses || item.storeCount || 0
  };
};

export const transformCategoryList = (list = []) => {
  return list.map(item => transformCategoryRow(item));
};
