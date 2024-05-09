import axios, { AxiosResponse } from 'axios';

import checkForToken from '@/utils/checkForToken';
import LocalStorage from '@/utils/localStorage';

const { authVerify, storageData } = checkForToken();

const accessToken = storageData?.state.accessToken;
const refreshToken = storageData?.state.refreshToken;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

export const chatInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

const onFulfiled = async (response: AxiosResponse) => {
  if (authVerify() === 'Refresh Token Expired') {
    return (
      alert('토큰이 만료되었습니다. 다시 로그인해 주시길 바랍니다.'),
      localStorage.clear(),
      (window.location.href = '/signin'),
      Promise.reject('Refresh Token Expired')
    );
  }

  if (
    authVerify() === 'Access Token Expired' &&
    authVerify() !== 'Refresh Token Expired'
  ) {
    const { authorization: newAccessToken } = response?.headers;

    storageData.state.accessToken = newAccessToken;

    LocalStorage.setItem('user-key', JSON.stringify(storageData));

    response.config.headers = Object.assign({}, response.config.headers, {
      authorization: `${newAccessToken}`,
      refresh: refreshToken ?? '',
    });

    return await axios(response.config);
  }

  return response;
};

instance.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(onFulfiled, (error) => {
  return Promise.reject(error);
});
