import { useEffect } from 'react';

import useLeafStore from '@/stores/leafStore';

import EmptyDiary from './EmptyDiary';
import Diary from './Diary';

import { DiaryDataInfo } from '@/types/data';

interface LeafDiaryProps {
  diaries: DiaryDataInfo[];
  pathUserId: number;
}

export default function LeafDiary({ diaries, pathUserId }: LeafDiaryProps) {
  const setLastDiaryDay = useLeafStore((state) => state.setLastDiaryDay);

  useEffect(() => {
    if (diaries && diaries.length !== 0) setLastDiaryDay(diaries[0].createdAt);
  }, [diaries]);

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
