import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getChatListById } from '@/api/chat';

const useInquiryListPaginationQuery = (id: string) => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['inquiryList', page],
    () => getChatListById({ pageParam: page }, id),
  );

  const pageInfo = data?.pageInfo;
  const chatList = data?.chatList;

  return {
    chatList,
    pageInfo,
    page,
    setPage,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useInquiryListPaginationQuery;
