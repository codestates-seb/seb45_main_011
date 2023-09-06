import { InputValues } from '@/types/common';
import fileListToFormData from '@/utils/fileListToFormData';
import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: 'http://13.209.96.203/v1',
});

export async function getLeafs() {
  return await commonAxios.get('/leaves').then((res) => res.data);
}

export async function getLeaf(leafId: number) {
  return await commonAxios.get(`/leaves/${leafId}`).then((res) => res.data);
}

export async function addLeaf(leaf: InputValues) {
  const image = fileListToFormData(leaf.image);
  const request = { leaName: leaf.nickname, content: leaf.leafContent, image };
  return fetch('http://localhost:8888/v1/leaves', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export async function deleteLeaf(leafId: number | null) {
  return await commonAxios.delete(`/leaves/${leafId}`).then((res) => res.data);
}
export async function editLeaf(leaf: InputValues, leafId: string) {
  const image = leaf.image ? fileListToFormData(leaf.image) : null;
  const request = {
    leafId,
    leaName: leaf.nickname,
    content: leaf.leafContent,
    image,
  };
  return fetch('http://localhost:8888/v1/leaves', {
    method: 'PATCH',
    body: JSON.stringify(request),
  });
}

export async function addDiary({
  leafId,
  data,
}: {
  leafId: number;
  data: InputValues;
}) {
  return await commonAxios
    .post(`/leaves/${leafId}/journals`, {
      postDto: {
        title: data.title,
        content: data.diaryContent,
      },
      image: fileListToFormData(data.image),
    })
    .then((res) => res.data);
}

export async function deleteDiary(diaryId: number) {
  return await commonAxios
    .delete(`/leaves/journals/${diaryId}`)
    .then((res) => res.data);
}
