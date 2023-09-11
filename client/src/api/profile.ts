import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const updateUserNickname = async (
  displayName: string,
  token: string,
) => {
  const response = await axios.patch(
    `${url}/v1/accounts/displayname`,
    {
      displayName,
    },
    { headers: { Authorization: token } },
  );

  return response;
};

export const updateUserPassword = async (
  presentPassword: string,
  changedPassword: string,
  token: string,
) => {
  const response = await axios.patch(
    `${url}/v1/accounts/password`,
    {
      presentPassword,
      changedPassword,
    },
    { headers: { Authorization: token } },
  );

  return response;
};

export const updateUserProfileImage = async (file: File, token: string) => {
  event?.preventDefault();

  if (!file) return;

  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const response = await axios.patch(
      `${url}/v1/accounts/profileimage`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
