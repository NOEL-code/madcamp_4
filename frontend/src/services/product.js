import { baseInstance } from './api';

export const getProducts = async () => {
  const response = await baseInstance.get('/products');
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await baseInstance.get(`/products/${productId}`);
  return response.data;
};

export const saveProduct = async (productData) => {
  const response = await baseInstance.post('/products', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await baseInstance.put(
    `/products/${productId}`,
    productData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const deleteProductById = async (productId) => {
  const response = await baseInstance.delete(`/products/${productId}`);
  return response.data;
};

export const biddingProduct = async (productId, bidData) => {
  const response = await baseInstance.post(
    `/products/bid/${productId}`,
    bidData
  );
  return response.data;
};

export const closeBid = async (productId) => {
  const response = await baseInstance.post(`/products/bid/close/${productId}`);
  return response.data;
};

export const getUserProducts = async (userId) => {
  const response = await baseInstance.get(`/products/user/${userId}`);
  return response.data;
};

export const getSuccessBidUserProducts = async (userId) => {
  const response = await baseInstance.get(
    `/products/successBid/user/${userId}`
  );
  return response.data;
};

export const getLikedProductListByUserId = async (userId) => {
  const response = await baseInstance.get(
    `/products/likedProductList/${userId}`
  );
  return response.data;
};
