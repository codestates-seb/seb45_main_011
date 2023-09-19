import Diary from './Diary';

import { DiaryDataInfo } from '@/types/data';

interface LeafDiaryProps {
  diaries: DiaryDataInfo[];
  pathUserId: string;
}

export default function LeafDiary({ diaries, pathUserId }: LeafDiaryProps) {
  return (
    <ul className="w-full h-[200px] flex flex-col items-center gap-4 overflow-y-scroll scrollbar pr-2 pb-4 ">
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
