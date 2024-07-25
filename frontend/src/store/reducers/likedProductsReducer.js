const initialState = {
  products: [],
};

const likedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LIKED_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'ADD_LIKED_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'REMOVE_LIKED_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload._id,
        ),
      };
    default:
      return state;
  }
};

export default likedProductsReducer;
