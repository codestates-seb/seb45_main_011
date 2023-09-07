import axios from 'axios';

// const url = process.env.NEXT_APP_API_URL;
const url = 'http://13.209.96.203';

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

export const getUserInfoByGoogle = async () => {
  const response = await axios.post(`${url}/oauth2/authorization/google`);

  return response;
};
