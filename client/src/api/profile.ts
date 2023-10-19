import { instance } from './axios';

export const updateUserNickname = async (displayName: string) => {
  const { data, headers, status } = await instance.patch(
    `/accounts/displayname`,
    {
      displayName,
    },
  );

  return { data, headers, status };
};

export const updateUserPassword = async (
  presentPassword: string,
  changedPassword: string,
) => {
  const { data, headers, status } = await instance.patch(`/accounts/password`, {
    presentPassword,
    changedPassword,
  });

  return { data, headers, status };
};

export const updateUserProfileImage = async (file: File) => {
  event?.preventDefault();

  if (!file) return;

  const formData = new FormData();
  formData.append('profileImage', file);

  const response = await instance.patch(`/accounts/profileimage`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
