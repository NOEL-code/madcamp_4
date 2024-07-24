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
  },
);

baseInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    const originalRequest = error.config;

    if (originalRequest.url.includes('/users/login') && statusCode === 401) {
      return Promise.reject(error);
    }

    if (statusCode === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
          removeCookie('accessToken');
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(
          `${BASE_URL}/users/refresh-token`,
          { refreshToken }, // 수정된 부분: refreshToken을 바디로 전송
        );
        const newAccessToken = refreshResponse.data.accessToken;
        setCookie('accessToken', newAccessToken, {
          path: '/',
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (err) {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
