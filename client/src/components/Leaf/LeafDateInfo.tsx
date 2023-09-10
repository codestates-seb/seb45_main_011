import useLeafStore from '@/stores/leafStore';

import { getDayElapsed } from '@/utils/getDayElapsed';

export default function LeafDateInfo() {
  const { startDay, lastDiaryDay } = useLeafStore();

  const daysSinceStart = getDayElapsed(startDay);
  const recentManaged = getDayElapsed(lastDiaryDay);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 font-bold text-sm leading-4 text-brown-70">
        키우기 시작한 지 :{' '}
        <b className="text-[1rem] font-bold leading-4 text-brown-80">
          {daysSinceStart}일 째
        </b>
      </p>
      <p className="mb-6 font-bold text-sm leading-4 text-brown-70">
        최근 관리 :{' '}
        <b className="text-[1rem] font-bold leading-4 text-brown-80">
          {recentManaged !== null ? recentManaged + '일 전' : '-'}
        </b>
      </p>
    </div>
  );
}
