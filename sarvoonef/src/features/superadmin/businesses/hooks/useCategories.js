import { useState, useEffect } from 'react';
import { getCategoriesApi, createCategoryApi, updateCategoryApi, deleteCategoryApi } from '../api/categories.api';
import { transformCategoryList } from '../services/categories.service';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    setLoading(true);
    getCategoriesApi()
      .then(res => {
        if (res.data && res.data.success) {
          setBusinessesAndCategories(res.data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setBusinessesAndCategories = (items) => {
    const list = transformCategoryList(items);
    setCategories(list);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = (name, description) => {
    if (!name) return Promise.reject(new Error('Name is required'));
    return createCategoryApi({ name, description })
      .then(() => {
        alert('Category created successfully!');
        fetchCategories();
      })
      .catch(err => {
        alert('Failed to create category');
        console.error(err);
      });
  };

  const editCategory = (id, nextName) => {
    if (!nextName) return Promise.reject(new Error('Name is required'));
    return updateCategoryApi(id, { name: nextName })
      .then(() => {
        alert('Category updated successfully!');
        fetchCategories();
      })
      .catch(err => {
        alert('Failed to update category');
        console.error(err);
      });
  };

  const deleteCategory = (id) => {
    if (confirm('Delete this category? Businesses mapped to it may need re-categorization.')) {
      return deleteCategoryApi(id)
        .then(() => {
          alert('Category deleted successfully!');
          fetchCategories();
        })
        .catch(err => {
          alert('Failed to delete category');
          console.error(err);
        });
    }
  };

  return {
    categories,
    loading,
    addCategory,
    editCategory,
    deleteCategory
  };
};
