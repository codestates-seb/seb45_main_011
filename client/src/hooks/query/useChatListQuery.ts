import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatListById } from '@/api/chat';

import useChatStore from '@/stores/chatStore';

const useChatListQuery = (id: string) => {
  const { roomId } = useChatStore();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['chatList', roomId],
      ({ pageParam = 0 }) => getChatListById({ pageParam }, id),

      {
        getNextPageParam: (lastPage) => {
          if (lastPage.pageInfo.last) return;

          if (lastPage.pageInfo.currentPage !== lastPage.pageInfo.totalPage) {
            return lastPage.pageInfo.currentPage + 1;
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

export default useChatListQuery;
