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
  const data = useGetSearchBoardQuery(searchKey);
  console.log(allBoards);
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
          <PostCard
            key={1}
            title={'ㅁ'}
            imageSrc={'/assets/img/bg_default_post.png'}
            likesNum={1}
            commentsNum={2}
            postId={2}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
}
