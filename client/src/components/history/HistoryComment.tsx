'use client';

import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroller';

import useUserStore from '@/stores/userStore';

import useHistoryComment from '@/hooks/useHistoryComment';

import { HistoryPostCard } from '.';
import EmptyDiary from '../leaf/EmptyDiary';
import { ErrorMessage, LoadingMessage } from '../common';

import { HistoryBoradProps } from '@/types/common';

export default function HistoryComment({ paramsId }: HistoryBoradProps) {
  const router = useRouter();

  const { userId } = useUserStore();

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useHistoryComment(paramsId);

  const likesAmount = (likes: []) => {
    if (likes?.length === 0) return 0;

    return likes.length;
  };

  return (
    <>
      {comments?.map((page, index) => (
        <div key={index}>
          {page.commentWritten?.length === 0 ? (
            <section
              key={index}
              className="w-[715px] my-4 max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center ml-1">
              <EmptyDiary
                pathUserId={paramsId}
                userId={userId}
                info="comment"
                className="max-w-[314px] max-[507px]:mx-3 max-[430px]:w-[214px] text-[13px]"
              />
            </section>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <section className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1 pb-4">
                {page.commentWritten?.map((board: any) => (
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
              </section>
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
