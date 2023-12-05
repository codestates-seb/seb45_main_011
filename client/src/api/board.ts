import axios from 'axios';

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

export async function getBoardsByPageNum({ pageParam = 1 }) {
  const res = await commonAxios
    .get(`/boards?page=${pageParam}`)
    .then((res) => res.data);

  return {
    boards: res.data,
    pageInfo: res.pageInfo,
    rank: res.data2,
  };
}

export async function getBoardsBySearch({
  pageParam,
  search,
}: {
  pageParam: number;
  search: string;
}) {
  const res = await commonAxios
    .get(`boards/keyword?page=${pageParam}&keyword=${encodeURI(search)}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .then((res) => res.data);
  return {
    boards: res.data,
    pageInfo: res.pageInfo,
  };
}

export async function getPostByBoardId(boardId: string) {
  const res = await commonAxios
    .get(`/boards/${boardId}`)
    .then((res) => res.data);
  return res.data;
}

export async function addComment(content: string, boardId: string) {
  return commonAxios.post(`comments/boards/${boardId}`, {
    content,
  });
}

export async function deleteComment(commentId: string) {
  return commonAxios.delete(`comments/${commentId}`);
}

export async function editComment(commentId: string, content: string) {
  return commonAxios.patch(`comments/${commentId}`, {
    content,
  });
}

export async function likeBoard(boardId: string) {
  return commonAxios.post(`likes/boards/${boardId}`);
}
