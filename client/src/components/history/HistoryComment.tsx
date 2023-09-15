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
            <div className="mt-3 overflow-hidden">
              <EmptyDiary
                pathUserId={paramsId}
                userId={userId}
                info="comment"
              />
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <div className="flex flex-wrap gap-x-4 gap-y-9 mb-9 max-[360px]:flex-col justify-center items-center mt-2 ml-[15px]">
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
