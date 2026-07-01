import api from './api';

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, newStep) => {
  const response = await api.put(`/orders/${orderId}/status`, { step: newStep });
  return response.data;
};