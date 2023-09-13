import axios from 'axios';

import { PostFormValues } from '@/types/data';

export const postAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: '',
  },
  withCredentials: true,
});

export const findPostById = async (postId: string) => {
  const { data } = await postAxios
    .get(`/boards/${postId}`)
    .then((res) => res.data);

  return data;
};

export const addPost = async (formValues: PostFormValues, tags: string[]) => {
  const formData = new FormData();

  const requestBoardDto = JSON.stringify({
    title: formValues.title,
    content: formValues.diaryContent,
    hashTags: tags,
  });

  const blob = new Blob([requestBoardDto], {
    type: 'application/json',
  });

  formData.append('image', formValues.image[0]);
  formData.append('requestBoardDto', blob);

  await postAxios.post(`/boards`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editPost = async (
  formValues: PostFormValues,
  tags: string[],
  postId: string,
) => {
  const formData = new FormData();

  const requestBoardDto = JSON.stringify({
    title: formValues.title,
    content: formValues.diaryContent,
    hashTags: tags,
  });

  const blob = new Blob([requestBoardDto], {
    type: 'application/json',
  });

  formValues.image && formData.append('image', formValues.image[0]);
  formData.append('requestBoardDto', blob);

  await postAxios.post(`/boards`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  await postAxios.patch(`/boards/${postId}`, formData);
};

export const deletePost = async (postId: number) =>
  await postAxios.delete(`/boards/${postId}`);
