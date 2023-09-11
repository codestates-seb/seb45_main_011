'use client';

import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/api/history';

import useUserStore from '@/stores/userStore';
import useHistoryStore from '@/stores/historyStore';

import Dropdown from './Dropdown';
import { useParams } from 'next/navigation';

type Token = {
  token: string;
};

export default function HistoryBoard({ token }: Token) {
  const userId = useUserStore((state) => state.userId);
  const { id } = useParams();

  const { boards, setBoards } = useHistoryStore();
  const setPoint = useUserStore((state) => state.setPoint);
  const selectOption = useHistoryStore(
    (state) => state.selectOption as keyof typeof state.boards,
  );

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['getBoards'],
    async ({ pageParam = 0 }) => {
      try {
        const selectedData = boards[selectOption];
        // const response = await getUserInfo(token);
        // console.log(response);

        // setBoards({ ...response.data.data });
        // return boards || {};
        return selectedData || {};
      } catch (error) {
        console.log(error);
      }
    },
    {
      getNextPageParam: (lastPage, pages) => null,
    },
  );

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await getUserInfo(token); // server에서 원하는 정보가 없으면? 다시실행함.

        setPoint(response.data.data.point.toLocaleString());
        setBoards({ ...response.data.data });
      } catch (error) {
        console.error(error);
      }
    };

    getHistoryData();
  }, []);

  // 무한스크롤 이전 코드
  // return (
  //   <>
  //     <Dropdown />

  //     <div className="w-[650px] mt-3 overflow-x-hidden overflow-y-scroll scrollbar">
  //       {boards[selectOption]?.length === 0 ? (
  //         <div className="overflow-x-hidden overflow-y-hidden">
  //           <div className="h-[195px] mt-1 flex justify-center items-center">
  //             게시글이 없습니다!
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="flex flex-wrap gap-x-4 gap-y-9 mb-9">
  //           {boards[selectOption]?.map((board, index) => (
  //             <div
  //               key={board.boardId}
  //               className="flex flex-col items-center justify-center w-[200px] h-[175px] rounded-lg border-2 border-brown-50 bg-brown-10 shadow-outer/down">
  //               <img
  //                 src={board.imageUrl}
  //                 className="w-[121px] h-[92px] rounded-lg"
  //               />
  //               <div className="text-sm font-bold mt-2 mb-[17px]">
  //                 {board.title}
  //               </div>
  //               <div className="w-full flex justify-start gap-3">
  //                 <div className="flex justify-center items-center gap-[6px] ml-3">
  //                   <img src="/assets/img/like.svg" />
  //                   <div>{board.likes?.length || 0}</div>
  //                 </div>
  //                 <div className="flex justify-center items-center gap-[6px]">
  //                   <img src="/assets/img/comment.svg" />
  //                   <div>100</div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

  return (
    <>
      {userId === +id && <Dropdown />}
      {data?.pages.map((page, index) => (
        <>
          {page?.length === 0 ? (
            <div className="w-full flex justify-center items-center scrollbar-hide">
              <div className="h-[195px] mt-1">게시글이 없습니다!</div>
            </div>
          ) : (
            <div
              className="w-[650px] mt-3 overflow-x-hidden overflow-y-scroll scrollbar"
              key={index}>
              <div className="flex flex-wrap gap-x-4 gap-y-9 mb-9">
                {page?.map((board, index) => (
                  <div
                    key={board.boardId}
                    className="flex flex-col items-center justify-center w-[200px] h-[175px] rounded-lg border-2 border-brown-50 bg-brown-10 shadow-outer/down">
                    <img
                      src={board.imageUrl}
                      className="w-[121px] h-[92px] rounded-lg"
                    />
                    <div className="text-sm font-bold mt-2 mb-[17px]">
                      {board.title}
                    </div>
                    <div className="w-full flex justify-start gap-3">
                      <div className="flex justify-center items-center gap-[6px] ml-3">
                        <img src="/assets/img/like.svg" />
                        <div>{board.likes?.length || 0}</div>
                      </div>
                      <div className="flex justify-center items-center gap-[6px]">
                        <img src="/assets/img/comment.svg" />
                        <div>100</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ))}
      {/* {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetching}>
          {isFetching ? '로딩 중...' : '더 불러오기'}
        </button>
      )} */}
    </>
  );
}
