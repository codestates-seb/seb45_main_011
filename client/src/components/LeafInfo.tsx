import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PageTitle from './common/PageTitle';
import CommonButton from './common/CommonButton';

import useLeafStore from '@/stores/leafStore';

import { DiaryDataInfo } from '@/types/data';

interface LeafInfoProps {
  userId: number;
  leafName?: string;
  imageUrl?: string;
  content?: string;
  createdAt?: string;
  diaries?: DiaryDataInfo[] | null;
}

/** 현재 날짜(now)와 비교할 날짜(day) 사이의 일수를 계산하는 함수 */
const getDayElapsed = (now: Date, day: Date) => {
  const timeDifference = now.getTime() - day.getTime();
  return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
};

// 추후 식물 정보와 날짜 부분 나누는 것 고려 -> 날짜 부분이 LeafDiary 컴포넌트로 가야할듯
export default function LeafInfo({
  leafName,
  imageUrl,
  content,
  createdAt,
  diaries,
  userId,
}: LeafInfoProps) {
  const router = useRouter();

  const setModalCategory = useLeafStore((state) => state.setModalCategory);
  const modalOpen = useLeafStore((state) => state.modalOpen);

  const startDay = new Date(createdAt as string);
  const now = new Date();

  /** 식물 카드를 등록한 날로부터 경과한 일수 */
  const daysSinceStart = getDayElapsed(now, startDay);

  /** 최근 일지를 작성한 날로부터 경과한 일수 (다이어리가 없다면 0)*/
  const recentManaged = diaries
    ? getDayElapsed(now, new Date(diaries[diaries.length - 1].createdAt)) +
      '일 전'
    : '0일 전';

  const navigateToGarden = () => router.push(`/garden/${userId}`);

  const AddDiary = () => {
    modalOpen();
    setModalCategory('add');
  };
  return (
    <div className="flex flex-col items-center">
      <PageTitle className=" mb-5" text={leafName || 'No title'} />
      <Image
        className="w-[232px] h-[180px] object-cover mb-2 border-2 border-brown-50 rounded-lg"
        src={imageUrl || ''}
        alt={leafName || ''}
        width={232}
        height={180}
      />
      <p className="p-[10px] mb-5 max-w-[232px] w-full bg-brown-10 border-2 border-brown-50 rounded-lg text-xs font-normal text-center">
        {content}
      </p>
      <div className="flex gap-2 mb-3">
        <CommonButton
          usage="button"
          size="sm"
          handleGardenClick={navigateToGarden}>
          정원에 설치하기
        </CommonButton>
        <CommonButton usage="button" size="sm" handleAddDiary={AddDiary}>
          일지 작성
        </CommonButton>
      </div>
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
