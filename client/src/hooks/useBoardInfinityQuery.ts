import { useInfiniteQuery } from '@tanstack/react-query';

import { getBoardsByPageNum } from '@/api/board';

export default function useBoardInfinityQuery() {
  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
  //   ['page'],
  //   fetchTodos,
  //   {
  //     getNextPageParam: (lastPage, allPosts) => {
  //       return lastPage.cursor + 1;
  //     },
  //   },
  // );
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['page'],
      ({ pageParam = 1 }) => getBoardsByPageNum({ pageParam }),
      {
        getNextPageParam: (lastPage, allPosts) => {
          console.log(lastPage);
          return lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
            ? lastPage.pageInfo.page + 1
            : undefined;
        },
      },
    );

  // return { data: data?.pages, fetchNextPage, hasNextPage };
  return { data: data?.pages, fetchNextPage, hasNextPage };
}
