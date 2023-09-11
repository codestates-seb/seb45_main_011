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

  const hashTag = JSON.stringify({
    hashTag: tags,
  });
  const requestBoardDto = JSON.stringify({
    requestBoardDto: {
      title: formValues.title,
      content: formValues.diaryContent,
    },
  });

  const hashTagBlob = new Blob([hashTag], { type: 'application/json' });
  const requestBoardDtoBlob = new Blob([requestBoardDto], {
    type: 'application/json',
  });

  formData.append('image', formValues.image[0]);
  formData.append('hashTag', hashTagBlob);
  formData.append('requestBoardDto', requestBoardDtoBlob);

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

  await postAxios.patch(`/boards/${postId}`, formData);
};

export const deletePost = async (postId: string) =>
  await postAxios.delete(`/boards/${postId}`);
