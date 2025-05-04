import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response?.data || { detail: 'Failed to fetch products' };
  }
};

export const getProduct = async (id) => {
  try {
    // Convert model-s to Model S format for backend lookup
    const formattedId = id.toLowerCase().includes('model') ? 
      id.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) : 
      id;
    
    const response = await api.get(`/products/${formattedId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error.response?.data || { detail: 'Failed to fetch product details' };
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error.response?.data || { detail: 'Failed to create order' };
  }
};

export const getUserOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error.response?.data || { detail: 'Failed to fetch orders' };
  }
};
