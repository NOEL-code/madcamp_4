const initialState = {
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default userReducer;
