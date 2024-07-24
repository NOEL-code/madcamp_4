import { baseInstance } from './api';
import { setCookie, getCookie, removeCookie } from './cookie';
import { store } from '../store/store';
import { loginSuccess, logoutSuccess } from '../store/actions/userActions';

export const join = async (userData) => {
  const response = await baseInstance.post('/users/register', userData);
  return response.data.response;
};

export const login = async (userEmail, userPassword) => {
  try {
    const response = await baseInstance.post('/users/login', {
      userEmail,
      userPassword,
    });
    console.log('login success', response);

    const accessToken = response.data.accessToken || '';
    const refreshToken = response.data.refreshToken || '';
    const userInfo = response.data.resUser;

    if (accessToken) {
      setCookie('accessToken', accessToken, { path: '/' });
    } else {
      console.error('accessToken is undefined');
    }

    if (refreshToken) {
      setCookie('refreshToken', refreshToken, { path: '/' });
    } else {
      console.error('refreshToken is undefined');
    }

    store.dispatch(loginSuccess(userInfo));

    return { userInfo, accessToken, refreshToken };
  } catch (err) {
    if (err.response && err.response.status === 403) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    } else if (err.response && err.response.status === 401) {
      throw new Error('아이디가 존재하지 않습니다.');
    } else {
      throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }
};

export const logout = async () => {
  const response = await baseInstance.post('/users/logout');
  removeCookie('accessToken');
  removeCookie('refreshToken');
  store.dispatch(logoutSuccess()); // 로그아웃 액션 디스패치

  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = getCookie('refreshToken');
  const response = await baseInstance.post('/users/refresh-token', {
    refreshToken,
  });
  const newAccessToken = response.data.accessToken; // 응답 본문에서 accessToken 가져오기
  setCookie('accessToken', newAccessToken, { path: '/' });
  return newAccessToken;
};

export const getUserNameById = async (userId) => {
  const response = await baseInstance.get(`users/${userId}`);
  return response.data.userName;
};

export const getAccountBalance = async (userId) => {
  const response = await baseInstance.get(`/users/accountBalance/${userId}`);
  return response.data.balance;
};
