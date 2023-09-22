import { useQueries } from '@tanstack/react-query';

import { getUserInfo } from '@/api/history';
import { getLeafsByUserId } from '@/api/leaf';

import { LeafsDataInfo } from '@/types/data';
import { UserData } from '@/types/common';

interface useGetLeafsPageQueries {
  pathUserId: string;
}

export default function useGetLeafsPageQueries({
  pathUserId,
}: useGetLeafsPageQueries) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['leafs'],
        queryFn: () => getLeafsByUserId(pathUserId),
      },
      {
        queryKey: ['user'],
        queryFn: () => getUserInfo(pathUserId),
      },
    ],
  });

  const leafs: LeafsDataInfo[] = results[0].data;
  const user: UserData = results[1].data?.data;

  const isLoading = results.some((results) => results.isLoading);
  const isError = results.some((results) => results.isError);

  return { leafs, user, isLoading, isError };
}
