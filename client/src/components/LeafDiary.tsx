import { DiaryInfo } from '@/types/common';

import EmptyDiary from './EmptyDiary';
import Diary from './Diary';

interface LeafDiaryProps {
  leafId: string;
  diary: DiaryInfo[];
}
export default function LeafDiary({ leafId, diary }: LeafDiaryProps) {
  return (
    <>
      {diary.length ? (
        <ul className="w-full flex flex-col items-center gap-4">
          {diary.map((item) => (
            <Diary key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <EmptyDiary leafId={leafId} />
      )}
    </>
  );
}
