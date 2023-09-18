'use client';

import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { getBoardWrittenByPage } from '@/api/history';

import useUserStore from '@/stores/userStore';

import EmptyDiary from '../leaf/EmptyDiary';
import HistoryPostCard from './HistoryPostCard';

import ErrorMessage from '../common/ErrorMessage';
import LoadingMessage from '../common/LoadingMessage';

import { HistoryBoradProps } from '@/types/common';
import useClient from '@/hooks/useClient';

export default function HistoryBoard({ paramsId }: HistoryBoradProps) {
  const router = useRouter();
  const isClient = useClient();
  const userId = useUserStore((state) => state.userId);

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['boardWritten'],
      ({ pageParam = 1 }) => getBoardWrittenByPage({ pageParam }, paramsId),

      {
        getNextPageParam: (lastPage) => {
          return lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
            ? lastPage.pageInfo.page + 1
            : undefined;
        },
      },
    );

  const likesAmount = (likes: []) => {
    if (likes?.length === 0) return 0;

    return likes.length;
  };

  return (
    <>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page?.boardWritten?.length === 0 ? (
            <div
              key={index}
              className="w-[715px] my-4 max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center ml-1">
              <EmptyDiary
                pathUserId={paramsId}
                userId={userId}
                info="board"
                addInfo="addBoard"
                className="max-w-[314px] max-[507px]:mx-3 max-[430px]:w-[214px] text-[13px]"
              />
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <div className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1 pb-4">
                {page.boardWritten?.map((board: any) => (
                  <div
                    key={board.boardId}
                    onClick={() => router.push(`/post/${board.boardId}`)}
                    className="cursor-pointer">
                    <HistoryPostCard
                      imageUrl={
                        board.imageUrls.length === 0
                          ? '/assets/img/bg_default_post.png'
                          : board.imageUrls[0]
                      }
                      title={board.title}
                      likes={likesAmount(board.likes)}
                      comment={board.commentNums}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="w-[715px] py-6 max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center">
          <LoadingMessage />
        </div>
      )}
      {isError && (
        <div className="w-[715px] py-6 max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center">
          <ErrorMessage />
        </div>
      )}
    </>
  );
}
