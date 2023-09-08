import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PageTitle from '../common/PageTitle';
import CommonButton from '../common/CommonButton';

import useLeafStore from '@/stores/leafStore';

interface LeafInfoProps {
  pathUserId: number;
  leafName: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  userId: number | null;
}

/** 현재 날짜(now)와 비교할 날짜(day) 사이의 일수를 계산하는 함수 */
const getDayElapsed = (now: Date, day: Date) => {
  const timeDifference = now.getTime() - day.getTime();
  return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
};

export default function LeafInfo({
  leafName,
  imageUrl,
  content,
  createdAt,
  pathUserId,
  userId,
}: LeafInfoProps) {
  const router = useRouter();

  const setModalCategory = useLeafStore((state) => state.setModalCategory);
  const modalOpen = useLeafStore((state) => state.modalOpen);
  const lastDiaryDay = useLeafStore((state) => state.lastDiaryDay);

  const startDay = new Date(createdAt);
  const now = new Date();

  /** 식물 카드를 등록한 날로부터 경과한 일수 */
  const daysSinceStart = getDayElapsed(now, startDay);

  /** 최근 일지를 작성한 날로부터 경과한 일수 */
  const recentManaged = lastDiaryDay
    ? getDayElapsed(now, new Date(lastDiaryDay)) + '일 전'
    : '-';

  const navigateToGarden = () => router.push(`/garden/${userId}`);

  const AddDiary = () => {
    setModalCategory('add');
    modalOpen();
  };
  return (
    <div className="flex flex-col items-center">
      <PageTitle className=" mb-5" text={leafName || 'No title'} />
      <div className="w-[232px] h-[180px]  mb-2 border-2 border-brown-50 rounded-lg overflow-hidden">
        <Image
          src={imageUrl || ''}
          alt={leafName || ''}
          width={242}
          height={190}
          className="object-cover w-[232px] h-[180px]"
        />
      </div>

      <p className="p-[10px] mb-5 max-w-[232px] w-full bg-brown-10 border-2 border-brown-50 rounded-lg text-xs font-normal text-center">
        {content}
      </p>
      {userId === pathUserId && (
        <div className="flex gap-2 mb-3">
          <CommonButton type="button" size="sm" onClick={navigateToGarden}>
            정원에 설치하기
          </CommonButton>
          <CommonButton type="button" size="sm" onClick={AddDiary}>
            일지 작성
          </CommonButton>
        </div>
      )}

      <p className="mb-2 font-bold text-sm leading-4 text-brown-70">
        키우기 시작한 지 :{' '}
        <b className="text-[1rem] font-bold leading-4 text-brown-80">
          {daysSinceStart}일 째
        </b>
      </p>
      <p className="mb-6 font-bold text-sm leading-4 text-brown-70">
        최근 관리 :{' '}
        <b className="text-[1rem] font-bold leading-4 text-brown-80">
          {recentManaged || ' - '}
        </b>
      </p>
    </div>
  );
}
