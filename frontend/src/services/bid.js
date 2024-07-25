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

export const findGameByProductId = async (productId) => {
  try {
    const response = await baseInstance.get(`/bid/game/${productId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to get Game');
    throw error;
  }
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

export const updateScore = async (productId, userId, score) => {
  try {
    const updateData = {
      productId: productId,
      userId: userId,
      score: score,
    };
    const response = await baseInstance.put('/bid/update/score', updateData);
    return response.data;
  } catch (error) {
    console.error('Failed to update score');
  }
};

export const closeGame = async (productId, winnerId, loserIds, bidAmount) => {
  try {
    const closeData = {
      productId: productId,
      winnerId: winnerId,
      loserIds: loserIds, // 배열임!!!
      bidAmount: bidAmount,
    };

    const response = await baseInstance.post(`/bid/game/close`, closeData);

    return response.data;
  } catch (error) {
    console.error('Failed to close Game');
  }
};
