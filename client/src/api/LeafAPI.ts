import { InputValues } from '@/types/common';
import fileListToFormData from '@/utils/fileListToFormData';
import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: 'http://13.209.96.203/v1',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjYsImRpc3BsYXlOYW1lIjoi6rSA66as7J6QIiwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjkzOTkyMDE0LCJleHAiOjE2OTM5OTM4MTR9.mQXsb9TiN-jJuFZ81q41hL7OCqa_CraQDwZ66ZL1wuk',
    Refresh:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTM5OTIwMTQsImV4cCI6MTY5NDAxNzIxNH0.DaGuQxnmMiN1rxx8bv0xHGH5ua9ZCLZ6b7IrIiy8n_I',
  },
});

/** 토큰을 통해 유저의 식물 카드 전체 조회 */
export async function getLeafs() {
  return await commonAxios.get('/leaves').then((res) => res.data);
}

/** leafId를 통해 해당 식물 카드 상세 조회 */
export async function getLeaf(leafId: number) {
  return await commonAxios.get(`/leaves/${leafId}`).then((res) => res.data);
}

/** leaf 데이터를 입력받아 식물 카드 등록 */
export async function addLeaf(leaf: InputValues) {
  const image = fileListToFormData(leaf.image);
  const requestData = {
    leaName: leaf.nickname,
    content: leaf.leafContent,
  };
  return await commonAxios
    .post(`/leaves/`, {
      leafPostDto: {
        ...requestData,
      },
      leafImage: image,
    })
    .then((res) => res.data);
}

/** leafId를 통해 식물 카드 삭제 */
export async function deleteLeaf(leafId: number) {
  return await commonAxios.delete(`/leaves/${leafId}`).then((res) => res.data);
}

/** leaf data를 입력받아 leafId에 해당하는 식물 카드 수정 */
export async function editLeaf({
  leaf,
  leafId,
}: {
  leaf: InputValues;
  leafId: number;
}) {
  const image = leaf.image ? fileListToFormData(leaf.image) : null;
  const requestData = {
    leafId,
    leaName: leaf.nickname,
    content: leaf.leafContent,
  };
  return await commonAxios
    .patch(`/leaves`, {
      leafPatchDto: {
        ...requestData,
      },
      leafImage: image,
    })
    .then((res) => res.data);
}

/** leafId를 통해 해당하는 식물 카드에 일지 등록 */
export async function addDiary({
  leafId,
  diary,
}: {
  leafId: number;
  diary: InputValues;
}) {
  const image = diary.image ? fileListToFormData(diary.image) : null;
  const requestData = {
    leafId,
    title: diary.title,
    content: diary.diaryContent,
  };
  return await commonAxios
    .post(`/leaves/${leafId}/journals`, {
      postDto: {
        ...requestData,
      },
      image,
    })
    .then((res) => res.data);
}

/** diary를 입력받아 journalId에 해당하는 journal(diary) 수정 */
export async function editDiary({
  diaryId,
  diary,
  userId,
}: {
  diaryId?: number | null;
  diary: InputValues;
  userId: number;
}) {
  if (!diaryId) return null;
  const image = diary.image ? fileListToFormData(diary.image) : null;
  const requestData = {
    title: diary.title,
    content: diary.diaryContent,
  };
  return await commonAxios
    .patch(`/leaves/journals/${diaryId}`, {
      patchDto: {
        ...requestData,
      },
      image,
      accountId: userId,
    })
    .then((res) => res.data);
}

// diaryId에 해당하는 diary 삭제
export async function deleteDiary(diaryId: number) {
  return await commonAxios
    .delete(`/leaves/journals/${diaryId}`)
    .then((res) => res.data);
}
