import InfiniteScroll from 'react-infinite-scroller';

import useBoardStore from '@/stores/boardStore';

import useBoardInfinityQuery from '@/hooks/useBoardInfinityQuery';
import useGetSearchBoardQuery from '@/hooks/useGetBoardSearchQuery';

import PostCard from './PostCard';

export default function PostList() {
  const searchKey = useBoardStore((state) => state.searchKey);

  const {
    data: allBoards,
    fetchNextPage,
    hasNextPage,
  } = searchKey ? useGetSearchBoardQuery(searchKey) : useBoardInfinityQuery();

  const boards = allBoards?.map((boards) => boards.boards).flat();

  return (
    <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
      {/* 무한 스크롤 직접 구현해보기 / 데이터가 많아지면 어떻게 처리할지 생각 -> 윈도잉 방식 */}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        loader={<div key="loader">loading...</div>}>
        <ul className="flex flex-wrap gap-4">
          {boards?.map((board) => {
            return (
              <PostCard
                key={board.boardId}
                title={board.title}
                imageSrc={board.boardImageUrl}
                likesNum={board.likeNum}
                commentsNum={board.commentNum}
                postId={board.boardId}
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
