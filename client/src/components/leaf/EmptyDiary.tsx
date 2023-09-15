import { useRouter } from 'next/navigation';

import useLeafStore from '@/stores/leafStore';

import { INFOMATION_TEXT } from '@/constants/contents';

import { DefaultProps } from '@/types/common';
import { twMerge } from 'tailwind-merge';

interface EmptyDiaryProps extends DefaultProps {
  pathUserId: string;
  userId: string | null;

  info: 'diary' | 'board' | 'likes' | 'comment';
  addInfo?: 'addDiary' | 'addBoard';
}

export default function EmptyDiary({
  pathUserId,
  userId,
  info,
  addInfo,
  className,
}: EmptyDiaryProps) {
  const isOwner = pathUserId === userId;
  const router = useRouter();

  const { modalOpen, setModalCategory } = useLeafStore();

  const addDiary = () => {
    modalOpen();
    setModalCategory('add');
  };

  const goToAddPost = () => {
    if (info === 'board') return router.push('/post/add');
  };

  const displayAddButton = info === 'board' || info === 'diary';

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={twMerge(
          `w-full pt-6 pb-5 flex flex-col gap-[1.1rem] justify-center items-center max-w-[414px] h-[137px] bg-brown-10 border-2 border-brown-50 rounded-lg shadow-outer/down max-[360px]:w-[240px] max-[380px]:h-[164px]`,
          className,
        )}>
        <div className="flex flex-col gap-2 text-center">
          <p className="font-bold text-[1.15rem] text-brown-70 break-words px-3 max-[460px]:pt-2 break-keep leading-6">
            {INFOMATION_TEXT[info]}
          </p>
          {isOwner && addInfo && (
            <p className=" font-bold text-[1rem] text-brown-50">
              {INFOMATION_TEXT[addInfo]}
            </p>
          )}
        </div>
        {isOwner && displayAddButton && (
          <button
            className="px-3 py-[6px] mb-2 bg-[url('/assets/img/bg_wood_dark.png')] bg-contain border-2 border-brown-70 rounded-lg shadow-outer/down text-base font-bold text-brown-10 hover:scale-110 transition-transform"
            onClick={info === 'diary' ? addDiary : goToAddPost}>
            작성하기
          </button>
        )}
      </div>
    </div>
  );
}
