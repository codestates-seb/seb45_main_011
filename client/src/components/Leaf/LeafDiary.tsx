import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import EmptyDiary from './EmptyDiary';
import Diary from './Diary';

import useLeafStore from '@/stores/leafStore';

import { DiaryDataInfo } from '@/types/data';

import { getDiaries } from '@/api/leaf';

interface LeafDiaryProps {
  leafId: number;
  pathUserId: number;
}

export default function LeafDiary({ leafId, pathUserId }: LeafDiaryProps) {
  const {
    data: diaries,
    isLoading,
    isError,
  } = useQuery<DiaryDataInfo[]>({
    queryKey: ['diaries', leafId],
    queryFn: () => getDiaries(leafId, pathUserId),
  });

  const setLastDiaryDay = useLeafStore((state) => state.setLastDiaryDay);

  useEffect(() => {
    if (diaries && diaries.length !== 0) setLastDiaryDay(diaries[0].createdAt);
  }, [diaries]);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!diaries?.length) return <EmptyDiary />;
  return (
    <ul className="w-full flex flex-col items-center gap-4">
      {diaries.map((diary) => (
        <Diary
          key={diary.journalId}
          journalId={diary.journalId}
          createdAt={diary.createdAt}
          imageUrl={diary.imageUrl}
          content={diary.content}
          title={diary.title}
          pathUserId={pathUserId}
        />
      ))}
    </ul>
  );
}
