import useLeafStore from '@/stores/leafStore';

interface EmptyDiaryProps {
  pathUserId: number;
  userId: number | null;
}

export default function EmptyDiary({ pathUserId, userId }: EmptyDiaryProps) {
  const isOwner = pathUserId === userId;

  const { modalOpen, setModalCategory } = useLeafStore();

  const addDiary = () => {
    modalOpen();
    setModalCategory('add');
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full pt-6 pb-5 flex flex-col gap-[1.1rem] justify-center items-center max-w-[414px] h-[137px] bg-brown-10 border-2 border-brown-50 rounded-lg shadow-outer/down max-[380px]:w-[240px] max-[380px]:h-[164px]">
        <div className="flex flex-col gap-2 text-center">
          <p className="font-bold text-[1.25rem] text-brown-70 break-words max-[380px]:w-[140px] max-[380px]:leading-6">
            등록된 일지가 없어요 : (
          </p>
          {isOwner && (
            <p className=" font-bold text-[1rem] text-brown-50">
              일지를 작성해보세요!
            </p>
          )}
        </div>
        {isOwner && (
          <button
            className="px-3 py-[6px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain border-2 border-brown-70 rounded-lg shadow-outer/down text-base font-bold text-brown-10 hover:scale-110 transition-transform"
            onClick={addDiary}>
            작성하기
          </button>
        )}
      </div>
    </div>
  );
}
