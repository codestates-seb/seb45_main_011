import { useInfiniteQuery } from '@tanstack/react-query';

import { getBoardWrittenByPage } from '@/api/history';

const useHistoryBoardQuery = (paramsId: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['boardWritten'],
      ({ pageParam = 1 }) => getBoardWrittenByPage({ pageParam }, paramsId),

      {
        getNextPageParam: (lastPage) => {
          return lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
            ? lastPage.pageInfo.page + 1
            : undefined;
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

export default useHistoryBoardQuery;
