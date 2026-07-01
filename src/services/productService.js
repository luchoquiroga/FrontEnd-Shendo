import api from './api';

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (productData) => {

    //Como enviamos una imagen (File), usamos FormData en vez de un JSON normal.
   // El backend en Python debe estar preparado para recibir 'multipart/form-data'.
   // en pocas palabras no sean unos wuachines y proyecten a deployar :)
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  if (productData.imageFile) {
    formData.append('image', productData.imageFile);
  } else {
    formData.append('emoji', productData.emoji);
  }

  const response = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};