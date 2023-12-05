import axios from 'axios';

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.refreshToken
    : null;

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

export async function getNotificationsByUserId(userId: string) {
  const res = await commonAxios
    .get(`/alarms/${userId}`)
    .then((res) => res.data);

  return res.data;
}

export async function showNotification(userId: string) {
  const res = await commonAxios
    .post(`/alarms/${userId}`)
    .then((res) => res.data);

  return res.data;
}

export async function deleteNotification(notificationId: string) {
  await commonAxios.delete(`/alarms/${notificationId}`);
}

export async function deleteAllNotification(userId: string) {
  await commonAxios.delete(`/alarms/all/${userId}`);
}
