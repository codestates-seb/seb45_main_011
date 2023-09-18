import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const postUserInfo = async (email: string, password: string) => {
  const response = await axios.post(`${url}/accounts/authentication`, {
    email,
    password,
  });

  return response;
};

export const postCreateUser = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const response = await axios.post(`${url}/accounts/signup`, {
    email,
    password,
    displayName,
  });

  return response;
};

export const sendCodeByEmail = async (email: string) => {
  const response = await axios.post(`${url}/emails/signup`, {
    email,
  });

  return response;
};

export const sendTemporaryPasswordByEmail = async (email: string) => {
  const response = await axios.post(`${url}/emails/password`, {
    email,
  });

  return response;
};

export const getUsersEmail = async () => {
  const response = await axios.get(`${url}/accounts/all`);

  return response;
};
