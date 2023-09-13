import { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import useBoardStore from '@/stores/boardStore';

import useBoardInfinityQuery from '@/hooks/useBoardInfinityQuery';
import useGetSearchBoardQuery from '@/hooks/useGetBoardSearchQuery';

import PostCard from './PostCard';

export default function PostList() {
  const [board, setBoard] = useState<any>();

  const searchKey = useBoardStore((state) => state.searchKey);
  const searchResult = useGetSearchBoardQuery(searchKey);

  // const {
  //   data: allBoards,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useBoardInfinityQuery();

  const {
    data: allBoards,
    fetchNextPage,
    hasNextPage,
  } = searchKey ? useGetSearchBoardQuery(searchKey) : useBoardInfinityQuery();

  useEffect(() => {
    const boards = allBoards?.map((ele) => ele.boards);
    if (boards) setBoard([].concat(...boards));
  }, [allBoards, searchKey]);

  return (
    <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
      {/* 무한 스크롤 직접 구현해보기 / 데이터가 많아지면 어떻게 처리할지 생각 -> 윈도잉 방식 */}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        loader={<div>loading...</div>}>
        <ul className="flex flex-wrap gap-4">
          {board &&
            board?.map(
              (ele: any) =>
                ele && (
                  <PostCard
                    key={ele.boardId}
                    title={ele.title}
                    imageSrc={ele.boardImageUrl}
                    likesNum={ele.likeNum}
                    commentsNum={ele.commentNum}
                    postId={ele.boardId}
                  />
                ),
            )}

          {/* {searchKey
            ? data?.searchBoards
            : allBoards?.map((ele) =>
                ele.passengers.map((e: any, idx: any) => (
                  <PostCard
                    key={idx}
                    title={idx}
                    imageSrc={idx}
                    likesNum={idx}
                    commentsNum={idx}
                    postId={idx}
                  />
                )),
              )} */}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
