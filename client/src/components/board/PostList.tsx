import InfiniteScroll from 'react-infinite-scroller';

import useBoardStore from '@/stores/boardStore';

import useBoardInfinityQuery from '@/hooks/useBoardInfinityQuery';
import useGetSearchBoardQuery from '@/hooks/useGetBoardSearchQuery';

import PostCard from './PostCard';

export default function PostList() {
  const {
    data: allBoards,
    fetchNextPage,
    hasNextPage,
  } = useBoardInfinityQuery();
  const searchKey = useBoardStore((state) => state.searchKey);
  const searchResult = useGetSearchBoardQuery(searchKey);

  return (
    <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        loader={<div>loading...</div>}>
        <ul className="flex flex-wrap gap-4">
          {allBoards?.map((ele) => {
            return ele.boards.map((e: any) => (
              <PostCard
                key={e.boardId}
                title={e.title}
                imageSrc={e.boardImageUrl}
                likesNum={e.likeNum}
                commentsNum={e.commentNum}
                postId={e.boardId}
              />
            ));
          })}
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
