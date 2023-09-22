import { useEffect } from 'react';

import { useQueries } from '@tanstack/react-query';

import { getDiariesByLeafAndUserId, getLeafByLeafId } from '@/api/leaf';

import useLeafStore from '@/stores/leafStore';

import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

interface useGetLeafPageQueries {
  pathUserId: string;
  pathLeafId: string;
}

export default function useGetLeafPageQueries({
  pathUserId,
  pathLeafId,
}: useGetLeafPageQueries) {
  const { setStartDay, setLastDiaryDay } = useLeafStore();
  const results = useQueries({
    queries: [
      {
        queryKey: ['leaf', pathLeafId],
        queryFn: () => getLeafByLeafId(pathLeafId),
      },
      {
        queryKey: ['diaries', pathLeafId],
        queryFn: () => getDiariesByLeafAndUserId(pathLeafId, pathUserId),
      },
    ],
  });
  const leaf: LeafDataInfo = results[0].data;
  const diaries: DiaryDataInfo[] = results[1].data;

  const isLoading = results.some((results) => results.isLoading);
  const isError = results.some((results) => results.isError);

  const isEmpty = !diaries || diaries?.length === 0;

  useEffect(() => {
    if (leaf?.createdAt) setStartDay(new Date(leaf.createdAt));
  }, [leaf]);

  useEffect(() => {
    if (!isEmpty) setLastDiaryDay(new Date(diaries[0].createdAt));
  }, [diaries]);

  return { leaf, diaries, isLoading, isError, isEmpty };
}
