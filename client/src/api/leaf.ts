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

/** 토큰을 통해 유저의 식물 카드 전체 조회 */
export async function getLeafsByUserId(userId: string) {
  const { data } = await commonAxios
    .get(`/leaves/account/${userId}`)
    .then((res) => res.data);

  return data;
}

/** leafId를 통해 해당 식물 카드 상세 조회 */
export async function getLeafByLeafId(leafId: string) {
  const { data } = await commonAxios
    .get(`/leaves/${leafId}`)
    .then((res) => res.data);
  return data;
}

/** leaf 데이터를 입력받아 식물 카드 등록 */
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

/** leafId를 통해 식물 카드 삭제 */
export async function deleteLeaf(leafId: string) {
  return await commonAxios.delete(`/leaves/${leafId}`).then((res) => res.data);
}

/** leaf data를 입력받아 leafId에 해당하는 식물 카드 수정 */
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

/** leafId에 해당하는 다이어리 전체 조회 */
export async function getDiariesByLeafAndUserId(
  leafId: string,
  userId: string,
) {
  const { data } = await commonAxios
    .get(`/leaves/${leafId}/journals`, { params: { accountId: userId } })
    .then((res) => res.data);
  return data;
}

/** leafId를 통해 해당하는 식물 카드에 일지 등록 */
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

/** diary를 입력받아 journalId에 해당하는 journal(diary) 수정 */
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

// diaryId에 해당하는 diary 삭제
export async function deleteDiary({
  diaryId,
  userId,
}: {
  diaryId: string;
  userId: string;
}) {
  const request = JSON.stringify({
    accountId: userId,
  });
  return await commonAxios
    .delete(`/leaves/journals/${diaryId}`, {
      data: request,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
}
