import { useState, useEffect } from 'react';
import { getPOSProducts, createSale } from '../services/salesService';
import { validateCartStock, validateSalePayload } from '../validations/salesValidation';
import { generateOrderNumber } from '../utils/salesFormatter';
import { TAX_RATE, DEFAULT_ORDER_TYPE, DEFAULT_ORDER_STATUS } from '../constants/salesConstants';

export default function usePOSProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPOSProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching POS products:', err);
      setError('Failed to load products. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Category list dynamically derived from products
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Cart operations
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    const currentQtyInCart = existing ? existing.qty : 0;

    const hasStockAvailable = validateCartStock(currentQtyInCart, product.stock);

    if (!hasStockAvailable) {
      alert(`Cannot add more. Only ${product.stock} items left in stock.`);
      return;
    }

    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, amount) => {
    const product = products.find(p => p.id === id);
    const updated = cart.map(item => {
      if (item.id === id) {
        const nextQty = item.qty + amount;
        if (product && nextQty > product.stock) {
          alert(`Cannot add more. Only ${product.stock} items left in stock.`);
          return item;
        }
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updated);
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.sellingPrice) * item.qty), 0);
  const tax = subtotal * TAX_RATE; 
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + tax - discountAmount;

  // Checkout submission
  const handleCheckout = async (paymentMethod) => {
    const orderNumber = generateOrderNumber();

    const salePayload = {
      orderNumber,
      orderType: DEFAULT_ORDER_TYPE,
      status: DEFAULT_ORDER_STATUS,
      totalAmount: total,
      taxAmount: tax,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.qty,
        price: Number(item.sellingPrice),
        gst: Number(item.gst || 0),
        total: Number(item.sellingPrice) * item.qty
      }))
    };

    const validation = validateSalePayload(salePayload);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    try {
      setCheckoutLoading(true);
      const createdOrder = await createSale(salePayload);

      // Set order info for Receipt Modal
      setLastOrder({
        orderNo: createdOrder.orderNumber || orderNumber,
        paymentMethod,
        date: new Date().toLocaleString(),
        items: [...cart],
        subtotal,
        tax,
        discount: discountAmount,
        total
      });

      setIsReceiptOpen(true);
      setCart([]);
      setDiscount(0);

      // Re-fetch products to display updated stocks
      fetchProducts();
    } catch (err) {
      console.error('POS Checkout failed:', err);
      alert(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Filtered products list
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.sku && product.sku.toLowerCase().includes(search.toLowerCase())) ||
      (product.barcode && product.barcode.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return {
    products,
    filteredProducts,
    loading,
    error,
    search,
    setSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    cart,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    discount,
    setDiscount,
    subtotal,
    tax,
    total,
    isReceiptOpen,
    setIsReceiptOpen,
    lastOrder,
    checkoutLoading,
    handleCheckout,
    refetchProducts: fetchProducts
  };
}
