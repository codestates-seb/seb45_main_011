import Image from 'next/image';

import useLeafStore from '@/stores/leafStore';
import useTestUserStore from '@/stores/testUserStore';

import ControlButton from '../common/ControlButton';
import NoImage from '../common/NoImage';

import { DiaryDataInfo } from '@/types/data';

interface DiaryProps extends DiaryDataInfo {
  pathUserId: number;
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

  const userId = useTestUserStore((state) => state.userId);

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
    <li className="w-full max-w-[414px]">
      <div className="flex justify-between">
        <span className="pt-2 font-bold text-[1.5rem] text-brown-80">
          {month + '/' + day}
        </span>
        <div className="relative grid grid-cols-1 gap-3 w-full max-w-[331px] max-h-[137px] p-4 pb-[0.9rem] bg-brown-10 border-2 border-brown-50 rounded-lg">
          {pathUserId === userId && (
            <div className="absolute right-[10px] top-[10px] flex gap-2">
              <ControlButton usage="edit" handleEditDiary={handleEditDiary} />
              <ControlButton
                usage="delete"
                handleDeleteDiary={handleDeleteDiary}
              />
            </div>
          )}

          <p className="text-[0.875rem] font-bold text-brown-80 ">{title}</p>
          <div className="flex gap-3">
            <div className=" rounded-lg w-[106px] h-[81px] overflow-hidden border-2 border-brown-40">
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
              className="max-w-[131px] w-full h-[81px] font-normal text-xs bg-transparent resize-none overflow-y-scroll scrollbar focus:outline-none"
              value={content}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
