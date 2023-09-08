import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;
const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;

export const postUserInfo = async (email: string, password: string) => {
  const response = await axios.post(`${url}/v1/accounts/authentication`, {
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
  const response = await axios.post(`${url}/v1/accounts/signup`, {
    email,
    password,
    displayName,
  });

  return response;
};

export const postCodeByEmail = async (email: string) => {
  const response = await axios.post(`${url}/v1/emails/signup`, {
    email,
  });

  return response;
};

export const postPasswordByEmail = async (email: string) => {
  const response = await axios.post(`${url}/v1/emails/password`, {
    email,
  });

  return response;
};

export const getUsersEmail = async () => {
  try {
    const response = await axios.get(`${url}/v1/accounts/all`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLoginToGoogle = () => {
  window.location.href = `${googleOauth}`;
};
