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

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: accessToken,
    Refresh: refreshToken,
  },
  withCredentials: true,
});

export async function getLeafsByUserId(userId: string) {
  const { data } = await commonAxios
    .get(`/leaves/account/${userId}`)
    .then((res) => res.data);

  return data;
}

export async function getLeafByLeafId(leafId: string) {
  const { data } = await commonAxios
    .get(`/leaves/${leafId}`)
    .then((res) => res.data);
  return data;
}

export async function addLeaf(inputs: InputValues) {
  const formData = convertToFormData({ usage: 'addLeaf', inputs });

  return await commonAxios
    .post(`/leaves`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export async function deleteLeaf(leafId: string) {
  return await commonAxios.delete(`/leaves/${leafId}`).then((res) => res.data);
}

export async function editLeaf({
  inputs,
  leafId,
  isImageUpdated,
}: {
  inputs: InputValues;
  leafId: string;
  isImageUpdated: boolean;
}) {
  const formData = convertToFormData({
    usage: 'editLeaf',
    inputs,
    leafId,
    isImageUpdated,
  });

  return await commonAxios
    .patch(`/leaves`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export async function getDiariesByLeafAndUserId(
  leafId: string,
  userId: string,
) {
  const { data } = await commonAxios
    .get(`/leaves/${leafId}/journals`, { params: { accountId: userId } })
    .then((res) => res.data);
  return data;
}

export async function addDiary({
  leafId,
  inputs,
  isImageUpdated,
  userId,
}: {
  leafId: string;
  inputs: InputValues;
  isImageUpdated?: boolean;
  userId: string;
}) {
  const formData = convertToFormData({
    usage: 'addDiary',
    inputs,
    isImageUpdated,
    leafId,
    userId,
  });
  return await commonAxios
    .post(`/leaves/${leafId}/journals`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export async function editDiary({
  diaryId,
  inputs,
  userId,
  isImageUpdated,
}: {
  diaryId?: string | null;
  inputs: InputValues;
  userId: string;
  isImageUpdated?: boolean;
}) {
  if (!diaryId) return null;

  const formData = convertToFormData({
    usage: 'editDiary',
    inputs,
    userId,
    isImageUpdated,
  });

  return await commonAxios
    .patch(`/leaves/journals/${diaryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export async function deleteDiary({
  diaryId,
  userId,
}: {
  diaryId: string;
  userId: string;
}) {
  return await commonAxios
    .delete(`/leaves/journals/${diaryId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { 'leaf-author-id': userId },
    })
    .then((res) => res.data);
}
