import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentWrittenByPage } from '@/api/history';

const useHistoryCommentQuery = (paramsId: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['commentWritten'],
      ({ pageParam = 1 }) => getCommentWrittenByPage({ pageParam }, paramsId),
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

export default useHistoryCommentQuery;
