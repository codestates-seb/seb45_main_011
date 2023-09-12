import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: '',
    // Refresh:
  },
  withCredentials: true,
});

/** 페이지를 query로 보내 게시물 조회 */
export async function getBoardsByPageNum({ pageParam = 1 }) {
  const res = await commonAxios
    .get(`/boards?page=${pageParam}`)
    .then((res) => res.data);
  return {
    boards: res.data,
    pageInfo: res.pageInfo,
  };
}

/** 검색어를 query로 보내 검색어를 포함하는 게시글 조회 */
export async function getBoardsBySearch(search: string) {
  const res = await commonAxios
    .get(`/boards?page=${search}`)
    .then((res) => res.data);

  return res.boards;
}

/** 검색어를 query로 보내 검색어를 포함하는 게시글 조회 */
export async function getPostByBoardId(boardId: string) {
  const res = await commonAxios
    .get(`/boards/${boardId}`)
    .then((res) => res.data);

  return res.data;
}

// 제거 예정
export async function fetchTodos({ pageParam = 2 }) {
  const resp = await axios(
    `https://api.instantwebtools.net/v1/passenger?page=${pageParam}&size=10`,
  ).then((resp) => resp.data);

  return {
    totalPassengers: resp.totalPassengers,
    totalPages: resp.totalPages,
    passengers: resp.data,
    cursor: pageParam,
  };
}
