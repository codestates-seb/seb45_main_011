import Image from 'next/image';

import useLeafStore from '@/stores/leafStore';
import useUserStore from '@/stores/userStore';

import ControlButton from '../common/ControlButton';

import { DiaryDataInfo } from '@/types/data';

interface DiaryProps extends DiaryDataInfo {
  pathUserId: string;
}

export default function Diary({
  journalId,
  createdAt,
  imageUrl,
  content,
  title,
  pathUserId,
}: DiaryProps) {
  const diary = {
    journalId,
    createdAt,
    imageUrl,
    content,
    title,
  };

  const userId = useUserStore((state) => state.userId);

  const { modalOpen, setModalCategory, setTargetDiary } = useLeafStore();

  const startDay = new Date(createdAt);
  const [month, day] = [startDay.getMonth() + 1, startDay.getDate()];

  const handleEditDiary = () => {
    modalOpen();
    setTargetDiary(diary);
    setModalCategory('edit');
  };

  const handleDeleteDiary = () => {
    modalOpen();
    setTargetDiary(diary);
    setModalCategory('delete');
  };

  return (
    <li className="w-full">
      <div className="flex gap-4 pl-4 w-full max-[480px]:flex-col">
        <span className="font-bold text-[1.5rem] mt-2 text-brown-80 max-[480px]:ml-2 max-[480px]:text-[1.3rem]">
          {month + '/' + day}
        </span>
        <div className="relative grid grid-cols-1 gap-2 w-full max-w-[380px] h-[150px] p-2 pb-[0.9rem] bg-brown-10 border-2 border-brown-50 rounded-lg shadow-outer/down">
          {pathUserId === userId && (
            <div className="absolute right-[10px] top-[10px] flex gap-2">
              <ControlButton
                usage="edit"
                handleEditDiary={handleEditDiary}
                className="hover:scale-105 hover:transition-transform"
              />
              <ControlButton
                usage="delete"
                handleDeleteDiary={handleDeleteDiary}
                className="hover:scale-105 hover:transition-transform"
              />
            </div>
          )}

          <p className="w-2/3 text-[0.875rem] font-bold text-brown-80 text-ellipsis overflow-hidden whitespace-nowrap break-all leading-7 ">
            {title}
          </p>
          <div className="flex gap-3 pr-7">
            <div className="rounded-lg w-[156px] h-[81px] overflow-hidden border-2 border-brown-40">
              <Image
                src={imageUrl || '/assets/img/bg_default_post.png'}
                alt=""
                width={116}
                height={91}
                className="object-cover w-[106px] h-[81px]"
              />
            </div>

            <textarea
              readOnly
              className="w-full h-[81px] font-normal text-xs bg-transparent resize-none overflow-y-scroll scrollbar focus:outline-none"
              value={content}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
