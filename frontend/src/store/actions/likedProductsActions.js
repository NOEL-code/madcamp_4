import { likeProduct, cancelLikeProduct } from '../../services/like';

export const setLikedProducts = (products) => ({
  type: 'SET_LIKED_PRODUCTS',
  payload: products,
});

export const addLikedProduct = (product) => async (dispatch) => {
  try {
    await likeProduct(product._id);
    dispatch({
      type: 'ADD_LIKED_PRODUCT',
      payload: product,
    });
  } catch (error) {
    console.error('Failed to add liked product:', error);
  }
};

export const removeLikedProduct = (product) => async (dispatch, getState) => {
  try {
    await cancelLikeProduct(product._id);
    const existingProduct = getState().likedProducts.products.find(
      (p) => p._id === product._id,
    );
    dispatch({
      type: 'REMOVE_LIKED_PRODUCT',
      payload: existingProduct,
    });
  } catch (error) {
    console.error('Failed to remove liked product:', error);
  }
};
