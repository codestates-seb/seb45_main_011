import { useInfiniteQuery } from '@tanstack/react-query';

import { getBoardLikedByPage } from '@/api/history';

const useHistoryLikesQuery = (paramsId: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['boardLiked'],
      ({ pageParam = 1 }) => getBoardLikedByPage({ pageParam }, paramsId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.pageInfo.totalElement === 0) return;

          if (lastPage.pageInfo.page !== lastPage.pageInfo.totalPages) {
            return lastPage.pageInfo.page + 1;
          }
        },
      },
    );

  return {
    data: data?.pages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
};

export default useHistoryLikesQuery;
