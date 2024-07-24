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

export const createGame = async (productId, sellerId, users) => {
  try {
    const gameData = {
      productId,
      sellerId,
      users,
    };
    console.log(gameData);
    const response = await baseInstance.post('/bid/create/game', gameData);
    return response.data;
  } catch (error) {
    console.error('Failed to create game:', error);
    throw error;
  }
};
