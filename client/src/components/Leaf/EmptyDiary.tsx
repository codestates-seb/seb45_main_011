import { useRouter } from 'next/navigation';

import useLeafStore from '@/stores/leafStore';

import { INFOMATION_TEXT } from '@/constants/contents';

interface EmptyDiaryProps {
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
      <div className="w-full pt-6 pb-5 flex flex-col gap-[1.1rem] justify-center items-center max-w-[414px] h-[137px] bg-brown-10 border-2 border-brown-50 rounded-lg shadow-outer/down max-[380px]:w-[240px] max-[380px]:h-[164px]">
        <div className="flex flex-col gap-2 text-center">
          <p className="font-bold text-[1.25rem] text-brown-70 break-words max-[380px]:w-[230px] max-[380px]:text-[18px] leading-6">
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
            className="px-3 py-[6px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain border-2 border-brown-70 rounded-lg shadow-outer/down text-base font-bold text-brown-10 hover:scale-110 transition-transform"
            onClick={info === 'diary' ? addDiary : goToAddPost}>
            작성하기
          </button>
        )}
      </div>
    </div>
  );
}
