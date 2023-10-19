import axios, { AxiosResponse } from 'axios';

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.refreshToken
    : null;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

const storageData = JSON.parse(localStorage.getItem('user-key') as string);

const parseJWT = (token: string | null) => {
  if (token) return JSON.parse(atob(token.split('.')[1]));
};

const authVerify = () => {
  const decodedAccess = parseJWT(accessToken);
  const decodedRefresh = parseJWT(refreshToken);

  if (decodedAccess?.exp * 1000 < Date.now()) {
    return 'Access Token Expired';
  }

  if (decodedRefresh?.exp * 1000 < Date.now()) {
    return 'Refresh Token Expired';
  }

  return true;
};

const onFulfiled = async (response: AxiosResponse) => {
  if (authVerify() === 'Access Token Expired') {
    const { authorization: newAccessToken } = response?.headers;

    storageData.state.accessToken = newAccessToken;

    localStorage.setItem('user-key', JSON.stringify(storageData));

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
