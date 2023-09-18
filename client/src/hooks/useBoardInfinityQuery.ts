import { useInfiniteQuery } from '@tanstack/react-query';

import { getBoardsByPageNum } from '@/api/board';

import useBoardStore from '@/stores/boardStore';

import useEffectOnce from './useEffectOnce';

export default function useBoardInfinityQuery() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['page'],
      ({ pageParam = 1 }) => getBoardsByPageNum({ pageParam }),
      {
        getNextPageParam: (lastPage, allPosts) => {
          return lastPage.pageInfo.totalPages &&
            lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
            ? lastPage.pageInfo.page + 1
            : undefined;
        },
      },
    );

  const { setBoardRank } = useBoardStore();

  useEffectOnce(() => {
    if (data) setBoardRank(data.pages[0].rank);
  });

  return {
    data: data?.pages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
}
