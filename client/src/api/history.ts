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
  const { data } = await historyAxios.get(`/accounts/${id}`);

  return data;
};

export const postUserPassword = async (password: string) => {
  const { data, headers } = await historyAxios.post(
    `/accounts/password/verification`,
    {
      password,
    },
  );

  return { data, headers };
};

export const deleteUser = async () => {
  const { status } = await historyAxios.delete(`/accounts`);

  return status;
};

export const getBoardWrittenByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await historyAxios
    .get(`/accounts/boardWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardWritten: response.data, pageInfo: response.pageInfo };
};

export const getBoardLikedByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await historyAxios
    .get(`/accounts/boardLiked/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardLiked: response.data, pageInfo: response.pageInfo };
};

export const getCommentWrittenByPage = async (
  { pageParam = 1 },
  id: string,
) => {
  const response = await historyAxios
    .get(`/accounts/commentWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { commentWritten: response.data, pageInfo: response.pageInfo };
};
