import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const postCreateGuest = async () => {
  const response = await axios.post(`${url}/accounts/guest`);

  return response;
};
