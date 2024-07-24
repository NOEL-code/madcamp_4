import { baseInstance } from './api';

export const biddingProduct = async (productId, bidData) => {
  const response = await baseInstance.post(`/bid/${productId}`, bidData);
  return response.data;
};

export const closeBid = async (productId) => {
  const response = await baseInstance.post(`/bid/close/${productId}`);
  return response.data;
};

export const updateSameScoreBid = async (productId) => {
  const response = await baseInstance.put(`/bid/sameScore/${productId}`);
  return response.data;
};
