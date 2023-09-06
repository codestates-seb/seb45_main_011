import EmptyDiary from './EmptyDiary';
import Diary from './Diary';

import { DiaryDataInfo } from '@/types/data';

interface LeafDiaryProps {
  leafId?: number;
  diaries?: DiaryDataInfo[] | null;
}
export default function LeafDiary({ diaries = [] }: LeafDiaryProps) {
  if (!diaries) return <EmptyDiary />;

  return (
    <ul className="w-full flex flex-col items-center gap-4">
      {diaries.map((diary) => (
        <Diary
          key={diary.diaryId}
          diaryId={diary.diaryId}
          createdAt={diary.createdAt}
          imageUrl={diary.imageUrl}
          content={diary.content}
          title={diary.title}
          modifiedAt={diary.modifiedAt}
        />
      ))}
    </ul>
  );
}
