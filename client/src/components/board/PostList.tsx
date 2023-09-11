import InfiniteScroll from 'react-infinite-scroller';

import useBoardInfinityQuery from '@/hooks/useBoardInfinityQuery';
import useGetSearchBoardQuery from '@/hooks/useGetBoardSearchQuery';

import useBoardStore from '@/stores/boardStore';

import PostCard from './PostCard';

export default function PostList() {
  const {
    data: allBoards,
    fetchNextPage,
    hasNextPage,
  } = useBoardInfinityQuery();
  const searchKey = useBoardStore((state) => state.searchKey);
  const data = useGetSearchBoardQuery(searchKey);

  return (
    <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => fetchNextPage()}
        useWindow={false}>
        <div className="flex flex-wrap gap-4">
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

          {/* <PostCard
          key={ele.boardId}
          title={ele.title}
          imageSrc={ele.imageUrl}
          likesNum={ele.likesNum}
          commentsNum={ele.commentsNum}
          postId={ele.boardId}
        /> */}
        </div>
      </InfiniteScroll>
    </div>
  );
}
