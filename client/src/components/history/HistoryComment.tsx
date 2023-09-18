'use client';

import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { getCommentWrittenByPage } from '@/api/history';

import useUserStore from '@/stores/userStore';

import EmptyDiary from '../leaf/EmptyDiary';
import HistoryPostCard from './HistoryPostCard';

import LoadingMessage from '../common/LoadingMessage';
import ErrorMessage from '../common/ErrorMessage';

import { HistoryBoradProps } from '@/types/common';

export default function HistoryComment({ paramsId }: HistoryBoradProps) {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['commentWritten'],
      ({ pageParam = 1 }) => getCommentWrittenByPage({ pageParam }, paramsId),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
            ? lastPage.pageInfo.page + 1
            : undefined;
        },
      },
    );

  return (
    <>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.commentWritten?.length === 0 ? (
            <div
              key={index}
              className="w-[715px] max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center ml-1">
              {' '}
              <EmptyDiary
                pathUserId={paramsId}
                userId={userId}
                info="comment"
                className="max-w-[314px] max-[507px]:mx-3 max-[430px]:w-[214px] text-[13px]"
              />
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <div className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1 pb-4">
                {page.commentWritten?.map((board: any) => (
                  <div
                    key={board.boardId}
                    onClick={() => router.push(`/post/${board.boardId}`)}
                    className="cursor-pointer">
                    <HistoryPostCard
                      imageUrl={
                        board.imageUrls || '/assets/img/bg_default_post.png'
                      }
                      title={board.title}
                      likes={
                        board.likes?.length === 0 ? 0 : board.likes?.length
                      }
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
        <div className="flex justify-center items-center">
          <LoadingMessage />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center">
          <ErrorMessage />
        </div>
      )}
    </>
  );
}
