import { likeProduct, cancelLikeProduct } from '../../services/like';

export const setLikedProducts = (products) => ({
  type: 'SET_LIKED_PRODUCTS',
  payload: products,
});

export const addLikedProduct = (product) => async (dispatch, getState) => {
  const { userInfo } = getState().user;
  try {
    await likeProduct(product._id, userInfo.id);
    dispatch({
      type: 'ADD_LIKED_PRODUCT',
      payload: product,
    });
  } catch (error) {
    console.error('Failed to add liked product:', error);
  }
};

export const removeLikedProduct = (productId) => async (dispatch, getState) => {
  const { userInfo } = getState().user;
  try {
    await cancelLikeProduct(productId, userInfo.id);
    dispatch({
      type: 'REMOVE_LIKED_PRODUCT',
      payload: productId,
    });
  } catch (error) {
    console.error('Failed to remove liked product:', error);
  }
};
