import axios from 'axios';

import { InputValues } from '@/types/common';

import convertToFormData from '@/utils/convertToFormData';

const accessToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.accessToken
    : null;

const refreshToken =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-key') as string).state.refreshToken
    : null;

export const postAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

export const findPostById = async (postId: string) => {
  const { data } = await postAxios
    .get(`/boards/${postId}`)
    .then((res) => res.data);

  return data;
};

export const addPost = async (formValues: InputValues, tags: string[]) => {
  const formData = convertToFormData({
    usage: 'addPost',
    inputs: formValues,
    tags,
  });

  await postAxios.post(`/boards`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editPost = async (
  formValues: InputValues,
  tags: string[],
  isImageUpdated: boolean,
  postId: string,
) => {
  const formData = convertToFormData({
    usage: 'editPost',
    inputs: formValues,
    tags,
    isImageUpdated,
  });

  await postAxios.patch(`/boards/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deletePost = async (postId: string) =>
  await postAxios.delete(`/boards/${postId}`);
