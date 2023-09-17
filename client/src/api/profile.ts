import axios from 'axios';

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('user-key') as string).state
        .refreshToken
    : null;

export const historyAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

export const updateUserNickname = async (displayName: string) => {
  const { data } = await historyAxios.patch(
    `/accounts/displayname`,
    displayName,
  );

  return data;
};

export const updateUserPassword = async (
  presentPassword: string,
  changedPassword: string,
) => {
  const { data } = await historyAxios.patch(`/accounts/password`, {
    presentPassword,
    changedPassword,
  });

  return data;
};

export const updateUserProfileImage = async (file: File) => {
  event?.preventDefault();

  if (!file) return;

  const formData = new FormData();
  formData.append('profileImage', file);

  const response = await historyAxios.patch(
    `/accounts/profileimage`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
