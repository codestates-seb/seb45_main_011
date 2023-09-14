'use client';

import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { getCommentWrittenByPage } from '@/api/history';

import HistoryPostCard from './HistoryPostCard';

import LoadingMessage from '../common/LoadingMessage';
import ErrorMessage from '../common/ErrorMessage';

import { HistoryBoradProps } from '@/types/common';

export default function HistoryComment({ paramsId }: HistoryBoradProps) {
  const router = useRouter();

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
            <div className="flex justify-center items-center overflow-hidden">
              <div className="flex justify-center items-center h-[195px] mt-1">
                게시글이 없습니다!
              </div>
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <div className="flex flex-wrap gap-x-4 gap-y-9 mb-9">
                {page.commentWritten?.map((board: any) => (
                  <div
                    key={board.boardId}
                    onClick={() => router.push(`/post/${board.boardId}`)}
                    className="cursor-pointer">
                    <HistoryPostCard
                      imageUrl={board.imageUrls}
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
