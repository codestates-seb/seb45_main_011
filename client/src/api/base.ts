import axios from 'axios';

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.refreshToken
    : null;

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});
