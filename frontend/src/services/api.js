import axios from 'axios';
import { getCookie, setCookie, removeCookie } from './cookie';

export const BASE_URL = 'http://localhost:3000/api';

export const baseInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

baseInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      console.log('토큰 인증실패');
      try {
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
          removeCookie('accessToken');
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(
          `${BASE_URL}/users/refresh-token`,
          null,
          {
            headers: {
              'Refresh-Token': `${refreshToken}`,
            },
          }
        );
        console.log('refreshResponse', refreshResponse);
        const newAccessToken = refreshResponse.headers.authorization;
        setCookie('accessToken', newAccessToken, {
          path: '/',
        });

        error.config.headers.Authorization = newAccessToken;

        return axios(error.config);
      } catch (err) {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
