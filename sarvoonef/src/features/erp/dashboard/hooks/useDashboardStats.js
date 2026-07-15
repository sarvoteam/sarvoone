import { useState, useEffect } from 'react';
import { getDashboardSummary } from '../services/dashboardService';
import { getSalesOrders } from '../../sales/services/salesService';
import { getInventoryProducts } from '../../inventory/services/inventoryService';

export default function useDashboardStats() {
  const [summary, setSummary] = useState(null);
  const [salesOrders, setSalesOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllStats = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch summary stats, sales list, and products list in parallel
      const [sumData, salesData, productsData] = await Promise.all([
        getDashboardSummary(),
        getSalesOrders(),
        getInventoryProducts()
      ]);

      const actualProducts = productsData.data?.data || productsData.data || [];
      setSummary(sumData || {});
      setSalesOrders(salesData || []);
      setProducts(actualProducts);
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
      setError('Failed to fetch dashboard data. Please make sure the backend is online.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  // Compute dynamic chart data from real sales orders
  const getChartData = () => {
    const data = [];
    const now = new Date();
    
    // Generate data points for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleString(undefined, { month: 'short' });
      data.push({
        month: label,
        year: d.getFullYear(),
        monthIndex: d.getMonth(),
        Sales: 0,
        Purchases: 0,
        Profit: 0
      });
    }

    // Accumulate total amount for sales orders matching the month
    salesOrders.forEach(order => {
      const date = new Date(order.createdAt);
      const match = data.find(pt => pt.year === date.getFullYear() && pt.monthIndex === date.getMonth());
      if (match) {
        match.Sales += order.totalAmount || 0;
      }
    });

    // Populate simulated Purchases and calculate Profit
    data.forEach(pt => {
      // If we have purchases in the database we could sum them here, otherwise simulate Purchases as ~55% of Sales
      pt.Purchases = pt.Sales > 0 ? Number((pt.Sales * 0.55).toFixed(2)) : 0;
      pt.Profit = Number((pt.Sales - pt.Purchases).toFixed(2));
    });

    return data;
  };

  // Identify low stock items (e.g. stock <= minStock or stock <= 5)
  const getLowStockAlerts = () => {
    return products
      .filter(p => p.stock <= (p.minStock || 5))
      .map(p => ({
        id: p.id,
        name: p.name,
        stock: p.stock,
        category: p.category,
        alertType: p.stock === 0 ? 'Out of Stock' : 'Low Stock'
      }))
      .slice(0, 5); // top 5 alerts
  };

  // Identify top-selling items based on real sales order items
  const getTopProducts = () => {
    const counts = {};
    
    salesOrders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          const prodId = item.productId;
          const name = item.product?.name || 'Unknown Product';
          const category = item.product?.category || 'General';
          const qty = item.quantity || 0;
          const revenue = (item.price || 0) * qty;

          if (!counts[prodId]) {
            counts[prodId] = { name, category, qty: 0, revenue: 0 };
          }
          counts[prodId].qty += qty;
          counts[prodId].revenue += revenue;
        });
      }
    });

    return Object.values(counts)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  };

  return {
    summary,
    salesOrders,
    products,
    loading,
    error,
    chartData: getChartData(),
    lowStockAlerts: getLowStockAlerts(),
    topProducts: getTopProducts(),
    refetch: fetchAllStats
  };
}
