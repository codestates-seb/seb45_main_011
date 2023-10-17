'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import usePostStore from '@/stores/postStore';
import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

interface ContolMenuProps {
  usage: 'post' | 'comment';
  targetId: string;
  ownerId: string;
}
export default function ControlMenu({
  usage,
  targetId,
  ownerId,
}: ContolMenuProps) {
  const router = useRouter();

  const userId = useUserStore((state) => state.userId);
  const { setEditMode, setTargetId } = usePostStore();
  const { open, changeType } = useModalStore();

  if (userId !== ownerId) return null;

  const handleEdit = () => {
    if (usage === 'post') return router.push(`/post/edit/${targetId}`);

    setTargetId(targetId);
    setEditMode(true);
    return null;
  };

  const handleDelete = () => {
    open();
    changeType(usage);
    setTargetId(targetId);
  };

  return (
    <div
      className={`absolute group w-[30px] h-[30px] right-0 bg-brown-50 border-2 border-brown-70 rounded-[50%] common-drop-shadow hover:scale-105 transition-transform ${BUTTON_STYLE[usage].container}`}
      role="button">
      <Image
        className={`absolute top-1/2 -mt-[2.5px] left-1/2 -ml-[10px] ${BUTTON_STYLE[usage].icon}`}
        src="/assets/icon/more.svg"
        alt="수정, 삭제 버튼"
        width={20}
        height={5}></Image>
      <div
        className={`absolute -left-[20px] top-[24px] w-[65px] h-[80px] group-hover:block ${BUTTON_STYLE[usage].hiddenContainer}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`hidden absolute left-0 bottom-0 w-[65px] h-fit group-hover:flex flex-col justify-center items-center border-2 border-brown-70 bg-brown-50 rounded-lg common-drop-shadow text-brown-10 text-[12px] leading-4 font-bold ${BUTTON_STYLE[usage].hiddenBox}`}>
          <button
            className="w-full py-[8px] border-dashed border-b-[1px] border-brown-10"
            onClick={handleEdit}>
            수정하기
          </button>
          <button className="w-full py-[8px] pt-[9px]" onClick={handleDelete}>
            삭제하기
          </button>
        </motion.div>
      </div>
    </div>
  );
}

const BUTTON_STYLE = {
  post: {
    container:
      'max-[500px]:w-[26px] max-[500px]:h-[26px] max-[500px]:top-[-10px]',
    icon: 'max-[500px]:w-[16px] max-[500px]:h-[16px] max-[500px]:top-[5px] max-[500px]:left-[13px]',
    hiddenContainer: '',
    hiddenBox: '',
  },
  comment: {
    container:
      'max-[500px]:w-[26px] max-[500px]:h-[26px] max-[500px]:top-[-10px]',
    icon: 'max-[500px]:w-[16px] max-[500px]:h-[16px] max-[500px]:top-[5px] max-[500px]:left-[13px]',
    hiddenContainer: '',
    hiddenBox: '',
  },
};
