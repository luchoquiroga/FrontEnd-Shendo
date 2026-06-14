import api from './api';

// esto sirve para obtener los prodcutos del restaurante.
export const getProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const createProduct = async (productData) => {
  
  const response = await api.post('/products/', {
    nombre: productData.nombre,
    precio: productData.precio,
    descripcion: productData.descripcion || '',
    stock: productData.stock || 0,
    imagen_url: productData.imagen_url || '',
    disponible: productData.disponible ?? true,
  });
  return response.data;
};