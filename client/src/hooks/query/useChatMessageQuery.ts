import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatMessageById } from '@/api/chat';

const useChatMessageQuery = (id: string) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['previousMessage'],
    ({ pageParam = 0 }) => getChatMessageById({ pageParam }, id),

    {
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo) {
          return lastPage.pageInfo.page !== lastPage.pageInfo.totalPages
            ? lastPage.pageInfo.page + 1
            : undefined;
        }
      },
    },
  );

  return {
    data: data?.pages,
    fetchNextPage,
    hasNextPage,
  };
};

export default useChatMessageQuery;
