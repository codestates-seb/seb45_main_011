import axios from 'axios';

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('user-key') as string).state
        .refreshToken
    : null;

export const historyAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

export const getUserInfo = async (id: string) => {
  const { data } = await historyAxios
    .get(`/accounts/${id}`)
    .then((response) => response.data);

  return data;
};

export const postUserPassword = async (password: string) => {
  const { data } = await historyAxios
    .post(`/accounts/password/verification`, password)
    .then((response) => response.data);

  return data;
};

export const deleteUser = async () => {
  const { data } = await historyAxios
    .delete(`/accounts`)
    .then((response) => response.data);

  return data;
};

export const getBoardWrittenByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await axios
    .get(`/accounts/boardWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardWritten: response.data, pageInfo: response.pageInfo };
};

export const getBoardLikedByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await axios
    .get(`/accounts/boardLiked/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardLiked: response.data, pageInfo: response.pageInfo };
};

export const getCommentWrittenByPage = async (
  { pageParam = 1 },
  id: string,
) => {
  const response = await axios
    .get(`/accounts/commentWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { commentWritten: response.data, pageInfo: response.pageInfo };
};
