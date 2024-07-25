import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option = {}) => {
  try {
    if (typeof value !== 'string') {
      throw new Error(`Invalid value type: ${typeof value}`);
    }
    const tokenValue = value.replace('Bearer ', '');
    cookies.set(name, tokenValue, { path: '/', ...option });
  } catch (error) {
    console.error(`Failed to set cookie: ${name}`, error);
  }
};

export const getCookie = (name) => {
  try {
    const cookieValue = cookies.get(name);
    return cookieValue;
  } catch (error) {
    console.error(`Failed to get cookie: ${name}`, error);
  }
};

export const removeCookie = (name) => {
  try {
    cookies.remove(name);
    console.log(`Removed cookie: ${name}`);
  } catch (error) {
    console.error(`Failed to remove cookie: ${name}`, error);
  }
};
