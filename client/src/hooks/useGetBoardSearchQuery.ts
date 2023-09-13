import { useInfiniteQuery } from '@tanstack/react-query';

import { getBoardsBySearch } from '@/api/board';

export default function useGetSearchBoardQuery(searchKey: string | null) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['search', searchKey],
    ({ pageParam = 1 }) =>
      getBoardsBySearch({ pageParam, search: searchKey || 'test' }),
    {
      enabled: searchKey !== null,
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.pageInfo.totalPages &&
          lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
          ? lastPage.pageInfo.page + 1
          : undefined;
      },
    },
  );
  return { data: data?.pages, fetchNextPage, hasNextPage };
}
