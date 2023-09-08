import { InputValues } from '@/types/common';
import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: '',

    // Refresh:
  },
  withCredentials: true,
});

/** 토큰을 통해 유저의 식물 카드 전체 조회 */
export async function getLeafs(userId: number) {
  const { data } = await commonAxios
    .get(`/leaves/account/${userId}`)
    .then((res) => res.data);

  return data;
}

/** leafId를 통해 해당 식물 카드 상세 조회 */
export async function getLeaf(leafId: number) {
  const { data } = await commonAxios
    .get(`/leaves/${leafId}`)
    .then((res) => res.data);
  return data;
}

/** leaf 데이터를 입력받아 식물 카드 등록 */
export async function addLeaf(inputs: InputValues) {
  const formData = new FormData();

  const jsonData = JSON.stringify({
    leafName: inputs.plantName,
    content: inputs.leafContent,
  });

  const blob = new Blob([jsonData], { type: 'application/json' });

  formData.append('leafImage', inputs?.image[0]);
  formData.append('leafPostDto', blob);

  return await commonAxios
    .post(`/leaves`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

/** leafId를 통해 식물 카드 삭제 */
export async function deleteLeaf(leafId: number) {
  console.log(leafId);
  return await commonAxios.delete(`/leaves/${leafId}`).then((res) => res.data);
}

/** leaf data를 입력받아 leafId에 해당하는 식물 카드 수정 */
export async function editLeaf({
  inputs,
  leafId,
  isImageUpdated,
}: {
  inputs: InputValues;
  leafId?: number;
  isImageUpdated: boolean;
}) {
  if (!leafId) return;

  const formData = new FormData();

  const jsonData = JSON.stringify({
    leafId: leafId,
    leafName: inputs.plantName,
    content: inputs.leafContent,
    isImageUpdated,
  });

  if (isImageUpdated) console.log(jsonData, inputs?.image[0]);

  const blob = new Blob([jsonData], { type: 'application/json' });

  if (isImageUpdated) formData.append('leafImage', inputs?.image[0]);
  formData.append('leafPatchDto', blob);

  return await commonAxios
    .patch(`/leaves`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

/** leafId에 해당하는 다이어리 전체 조회 */
export async function getDiaries(leafId: number, userId: number) {
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
  leafId: number;
  inputs: InputValues;
  isImageUpdated?: boolean;
  userId: number;
}) {
  const formData = new FormData();

  const postDtoData = JSON.stringify({
    title: inputs.title,
    content: inputs.diaryContent,
    isImageUpdated,
  });

  const leafAuthorData = JSON.stringify({
    accountId: userId,
  });

  const postDtoBlob = new Blob([postDtoData], { type: 'application/json' });
  const leafAuthorBlob = new Blob([leafAuthorData], {
    type: 'application/json',
  });

  if (isImageUpdated) formData.append('image', inputs.image[0]);
  formData.append('postDto', postDtoBlob);
  formData.append('leafAuthor', leafAuthorBlob);

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
  diaryId?: number | null;
  inputs: InputValues;
  userId: number;
  isImageUpdated?: boolean;
}) {
  if (!diaryId) return null;
  const formData = new FormData();

  const patchDtoData = JSON.stringify({
    title: inputs.title,
    content: inputs.diaryContent,
    isImageUpdated,
  });
  const leafAuthorData = JSON.stringify({
    accountId: userId,
  });

  const patchDtoBlob = new Blob([patchDtoData], { type: 'application/json' });
  const leafAuthorBlob = new Blob([leafAuthorData], {
    type: 'application/json',
  });

  if (isImageUpdated) formData.append('image', inputs.image[0]);
  formData.append('patchDto', patchDtoBlob);
  formData.append('leafAuthor', leafAuthorBlob);

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
  diaryId: number;
  userId: number;
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
