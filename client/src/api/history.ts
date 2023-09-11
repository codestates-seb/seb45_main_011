import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getUserInfo = async (token: string) => {
  const response = await axios.get(`${url}/v1/accounts`, {
    headers: { Authorization: token },
  });

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
