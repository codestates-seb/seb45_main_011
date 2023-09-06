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

export async function getLeafs() {
  return await commonAxios.get('/leaves').then((res) => res.data);
}

export async function getLeaf(leafId: number) {
  return await commonAxios.get(`/leaves/${leafId}`).then((res) => res.data);
}

export async function addLeaf(leaf: InputValues) {
  const image = fileListToFormData(leaf.image);
  const requestTextData = {
    leaName: leaf.nickname,
    content: leaf.leafContent,
  };
  return await commonAxios
    .post(`/leaves/`, {
      leafPostDto: {
        leafName: requestTextData.leaName,
        content: requestTextData.content,
      },
      image,
    })
    .then((res) => res.data);
}

export async function deleteLeaf(leafId: number | null) {
  return await commonAxios.delete(`/leaves/${leafId}`).then((res) => res.data);
}
export async function editLeaf(leaf: InputValues, leafId: number) {
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
