import { baseInstance } from './api';
import { setCookie, getCookie, removeCookie } from './cookie';
import store from '../store/store';
import { loginSuccess } from '../store/actions/userAction';

export const join = async (userData) => {
  const response = await baseInstance.post('/users/register', userData);
  return response.data.response;
};

export const login = async (userEmail, userPassword) => {
  const response = await baseInstance.post('/users/login', {
    userEmail,
    userPassword,
  });
  console.log('login success', response);
  const accessToken = response.headers.authorization;
  const refreshToken = response.headers['refresh-token'];
  const userInfo = response.data.response;
  console.log(accessToken);
  store.dispatch(loginSuccess(userInfo));
  setCookie('accessToken', accessToken, { path: '/' });
  setCookie('refreshToken', refreshToken, { path: '/' });
  console.log('set Token', response);
  return { userInfo, accessToken, refreshToken };
};

export const logout = async () => {
  const response = await baseInstance.post('/users/logout');
  removeCookie('accessToken');
  removeCookie('refreshToken');
  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = getCookie('refreshToken');
  const response = await baseInstance.post('/users/refresh-token', null, {
    headers: {
      'Refresh-Token': refreshToken,
    },
  });
  const newAccessToken = response.headers.authorization;
  setCookie('accessToken', newAccessToken, { path: '/' });
  return newAccessToken;
};

export const getAccountBalance = async (userId) => {
  const response = await baseInstance.get(`/users/accountBalance/${userId}`);
  return response.data.balance;
};

export const likeProduct = async (productId) => {
  const response = await baseInstance.post(`/users/like/${productId}`);
  return response.data;
};

export const cancelLikeProduct = async (productId) => {
  const response = await baseInstance.delete(`/users/like/${productId}`);
  return response.data;
};
