'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { getBoardLikedByPage } from '@/api/history';

import HistoryPostCard from './HistoryPostCard';

import { HistoryBoradProps } from '@/types/common';
import { useRouter } from 'next/navigation';

export default function HistoryLikes({ paramsId }: HistoryBoradProps) {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['boardLiked'],
      ({ pageParam = 1 }) => getBoardLikedByPage({ pageParam }, paramsId),
      {
        getNextPageParam: (lastPage, allPosts) => {
          if (lastPage.pageInfo.totalElement === 0) return;

          if (lastPage.pageInfo.page !== lastPage.pageInfo.totalPages) {
            return lastPage.pageInfo.page + 1;
          }
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
          {page?.boardLiked?.length === 0 ? (
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
                {page.boardLiked?.map((board: any) => (
                  <div
                    key={board.boardId}
                    onClick={() => router.push(`/post/${board.boardId}`)}
                    className="cursor-pointer">
                    <HistoryPostCard
                      imageUrl={board.imageUrls}
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
    </>
  );
}
