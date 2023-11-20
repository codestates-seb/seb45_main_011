import { instance } from './axios';

export const getUserInfo = async (id: string) => {
  const { data } = await instance.get(`/accounts/${id}`);

  return data;
};

export const postUserPassword = async (password: string) => {
  const { data, headers } = await instance.post(
    `/accounts/password/verification`,
    {
      password,
    },
  );

  return { data, headers };
};

export const deleteUser = async () => {
  const { status } = await instance.delete(`/accounts`);

  return status;
};

export const getBoardWrittenByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await instance
    .get(`/accounts/boardWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardWritten: response.data, pageInfo: response.pageInfo };
};

export const getBoardLikedByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await instance
    .get(`/accounts/boardLiked/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardLiked: response.data, pageInfo: response.pageInfo };
};

export const getCommentWrittenByPage = async (
  { pageParam = 1 },
  id: string,
) => {
  const response = await instance
    .get(`/accounts/commentWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { commentWritten: response.data, pageInfo: response.pageInfo };
};
