'use client';

import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroller';

import useHistoryBoardQuery from '@/hooks/query/useHistoryBoardQuery';

import { HistoryPostCard } from '.';
import { EmptyDiary } from '../leaf';
import { ErrorMessage, LoadingMessage } from '../common';

export interface HistoryBoardProps {
  paramsId: string;
}

export default function HistoryBoard({ paramsId }: HistoryBoardProps) {
  const router = useRouter();

  const {
    data: boards,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useHistoryBoardQuery(paramsId);

  const likesAmount = (likes: []) => {
    if (likes?.length === 0) return 0;

    return likes.length;
  };

  return (
    <>
      {boards?.map((page, index) => (
        <div key={index}>
          {page?.boardWritten?.length === 0 ? (
            <section
              key={index}
              className="w-[715px] my-4 max-[730px]:w-[512px] max-[630px]:w-[312px] flex justify-center items-center ml-1">
              <EmptyDiary
                info="board"
                addInfo="addBoard"
                className="max-w-[314px] max-[507px]:mx-3 max-[430px]:w-[214px] text-[13px]"
              />
            </section>
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={() => fetchNextPage()}>
              <section className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1 pb-4">
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
