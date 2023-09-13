import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjEsImRpc3BsYXlOYW1lIjoi6rSA66as7J6QIiwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl0sInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjk0NjA4ODM1LCJleHAiOjE2OTQ2MTA2MzV9.WES0RX-cNgK_8agBd2hoQ3TSFS7XF58Ekc9ZnNDQOm0',
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

  console.log(res);
  return {
    boards: res.data,
    pageInfo: res.pageInfo,
  };
}

/** 검색어를 query로 보내 검색어를 포함하는 게시글 조회 */
export async function getPostByBoardId(boardId: string) {
  const res = await commonAxios
    .get(`/boards/${boardId}`)
    .then((res) => res.data);
  return res.data;
}

/** boardId에 해당하는 게시글에 댓글 등록 */
export async function addComment(content: string, boardId: number) {
  return commonAxios.post(`comments/boards/${boardId}`, {
    content,
  });
}
/** commentId에 해당하는 댓글 삭제 */
export async function deleteComment(commentId: number) {
  console.log(commentId);
  return commonAxios.delete(`comments/${commentId}`);
}
