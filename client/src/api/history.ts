import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getUserInfo = async (id: string) => {
  const response = await axios.get(`${url}/v1/accounts/${id}`);

  return response;
};

export const postUserPassword = async (password: string, token: string) => {
  const response = await axios.post(
    `${url}/v1/accounts/password/verification`,
    {
      password,
    },
    {
      headers: { Authorization: token },
    },
  );

  return response;
};

export const deleteUser = async (token: string) => {
  const response = await axios.delete(`${url}/v1/accounts`, {
    headers: { Authorization: token },
  });

  return response;
};

export const getBoardWrittenByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await axios
    .get(`${url}/v1/accounts/boardWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardWritten: response.data, pageInfo: response.pageInfo };
};

export const getBoardLikedByPage = async ({ pageParam = 1 }, id: string) => {
  const response = await axios
    .get(`${url}/v1/accounts/boardLiked/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { boardLiked: response.data, pageInfo: response.pageInfo };
};

export const getCommentWrittenByPage = async (
  { pageParam = 1 },
  id: string,
) => {
  const response = await axios
    .get(`${url}/v1/accounts/commentWritten/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { commentWritten: response.data, pageInfo: response.pageInfo };
};
