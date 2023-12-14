import axios from 'axios';

import { instance } from './axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const postCreateGuest = async () => {
  const response = await axios.post(`${url}/accounts/guest`);

  return response;
};

export const deleteGuestMode = async () => {
  const response = await instance.delete(`${url}/accounts`);

  return response;
};
