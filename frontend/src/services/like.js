import { baseInstance } from './api';

export const likeProduct = async (productId) => {
  const response = await baseInstance.post(`/likes/${productId}`);
  return response.data;
};

export const cancelLikeProduct = async (productId) => {
  const response = await baseInstance.delete(`/likes/${productId}`);
  return response.data;
};

export const getLikedProductListByUserId = async () => {
  const response = await baseInstance.get(`/likes`);
  return response.data;
};
