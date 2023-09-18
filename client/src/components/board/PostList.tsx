import InfiniteScroll from 'react-infinite-scroller';

import useBoardStore from '@/stores/boardStore';

import useBoardInfinityQuery from '@/hooks/useBoardInfinityQuery';
import useGetSearchBoardQuery from '@/hooks/useGetBoardSearchQuery';

import PostCard from './PostCard';
import EmptySearch from './EmptySearch';
import LoadingNotice from '../common/LoadingNotice';
import ErrorMessage from '../common/ErrorMessage';

export default function PostList() {
  const { searchKey } = useBoardStore();

  const {
    data: allBoards,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = searchKey ? useGetSearchBoardQuery(searchKey) : useBoardInfinityQuery();

  const boards = allBoards?.map((boards) => boards.boards).flat();

  return (
    <div className="pr-3 w-full h-[404px] overflow-y-scroll scrollbar">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingNotice isTransparent={true} />
        </div>
      )}
      {isError && (
        <div className="w-full h-full flex justify-center items-center">
          <ErrorMessage />
        </div>
      )}
      {boards?.length === 0 && searchKey && (
        <div className="pt-10 pl-5 flex justify-center items-center">
          <EmptySearch />
        </div>
      )}
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        loader={<LoadingNotice key="loader" isTransparent={true} />}>
        <ul className="grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1 p-2 pb-4">
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
