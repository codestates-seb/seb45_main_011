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
    boards: res.boards,
    pageInfo: res.pageInfo,
  };
}

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
