import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import useUserStore from '@/stores/userStore';

const { setAccessToken } = useUserStore();

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.refreshToken
    : null;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

// atob을 활용한 JWT 디코딩
const parseJWT = (token: string | null) => {
  if (token) return JSON.parse(atob(token.split('.')[1]));
};

const authVerify = () => {
  const decodedAccess = parseJWT(accessToken);
  const decodedRefresh = parseJWT(refreshToken);

  if (decodedAccess.exp * 1000 < Date.now()) {
    return 'Access Token Expired';
  }

  if (decodedRefresh.exp * 1000 < Date.now()) {
    return 'Refresh Token Expired';
  }

  return true;
};

// 응답 받기 전, 새로운 accessToke이 존재하면 바꿔주기
export const onFulfiled = async (response: AxiosResponse) => {
  if (authVerify() === 'Access Token Expired') {
    const { authorization: newAccessToken } = response.headers;

    setAccessToken(newAccessToken);

    // 타입 호환을 위해 새로운 객체를 만들어서 업데이트하기
    response.config.headers = Object.assign({}, response.config.headers, {
      authorization: `${newAccessToken}`,
    });

    return await axios(response.config);
  }

  return response;
};

instance.interceptors.request.use(
  //! AxiosRequestConfig 대신 InternalAxiosRequestConfig를 사용하라고 하는데...
  // InternalAxiosRequestConfig를 개발자가 직접 건드는게 좋은건 아니라고 하던데 흠...
  async (config: InternalAxiosRequestConfig) => {
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
