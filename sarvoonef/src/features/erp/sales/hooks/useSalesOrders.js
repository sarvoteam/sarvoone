import { useState, useEffect } from 'react';
import { getSalesOrders } from '../services/salesService';

export default function useSalesOrders() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [viewType, setViewType] = useState('Invoices'); // 'Invoices' / 'Quotations' / 'Challans'

  // Modal state for viewing order details
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getSalesOrders();
      setSales(data);
    } catch (err) {
      console.error('Error fetching sales:', err);
      setError('Failed to fetch sales records from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Filter based on search
  const filteredSales = sales.filter(sale => {
    const orderNum = sale.orderNumber || '';
    const customerName = sale.customer?.name || 'Walk-in Customer';
    const matchesSearch =
      orderNum.toLowerCase().includes(search.toLowerCase()) ||
      customerName.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return {
    sales,
    filteredSales,
    loading,
    error,
    search,
    setSearch,
    viewType,
    setViewType,
    selectedOrder,
    isModalOpen,
    openOrderDetails,
    closeOrderDetails,
    refetchSales: fetchSales
  };
}
