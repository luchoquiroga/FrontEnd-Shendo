import api from './api';

// El backend filtra por restaurante usando el token asignado al usuario.
export const getOrders = async () => {
  const response = await api.get('/orders/');
  return response.data;
};
//Esto sirve para actualizar el estado del pedido.
export const updateOrderStatus = async (pedidoId, nuevoEstado) => {
  const response = await api.put(`/orders/${pedidoId}/`, { estado: nuevoEstado });
  return response.data;
};