'use client';

import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroller';

import useHistoryLikesQuery from '@/hooks/query/useHistoryLikesQuery';

import { HistoryPostCard } from '.';
import { EmptyDiary } from '../leaf';
import { ErrorMessage, LoadingMessage } from '../common';

import { HistoryBoradProps } from '@/types/common';

export default function HistoryLikes({ paramsId }: HistoryBoradProps) {
  const router = useRouter();

  const {
    data: likes,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useHistoryLikesQuery(paramsId);

  const likesAmount = (likes: []) => {
    if (likes?.length === 0) return 0;

    return likes.length;
  };

  return (
    <>
      {likes?.map((page, index) => (
        <div key={index}>
          {page?.boardLiked?.length === 0 ? (
            <div
              key={index}
              className="w-[715px] my-4 max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center ml-1">
              <EmptyDiary
                info="likes"
                className="max-w-[314px] max-[507px]:mx-3 max-[430px]:w-[214px] text-[13px]"
              />
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <div className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1 pb-4">
                {page.boardLiked?.map((board: any) => (
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
