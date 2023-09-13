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
    <div className="pr-3 w-full h-[404px] overflow-y-scroll scrollbar">
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        loader={<div key="loader">loading...</div>}>
        <ul className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1">
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
