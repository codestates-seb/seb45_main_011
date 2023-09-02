import { LeafType } from '@/types/common';
import LeafDiary from './LeafDiary';
import DATA from '@/mock/diary.json';
import PageTitle from './common/PageTitle';

interface LeafInfoProps {
  leaf: LeafType;
}

export default function LeafInfo({ leaf }: LeafInfoProps) {
  return (
    <div className="flex flex-col justify-center">
      <PageTitle text={leaf.name} />
      <LeafDiary diary={leaf.diary || []} />
    </div>
  );
}
