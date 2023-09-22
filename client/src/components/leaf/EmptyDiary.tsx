'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import useLeafStore from '@/stores/leafStore';

import { INFOMATION_TEXT } from '@/constants/contents';

import { DefaultProps } from '@/types/common';

interface EmptyDiaryProps extends DefaultProps {
  info: 'diary' | 'board' | 'likes' | 'comment';
  addInfo?: 'addDiary' | 'addBoard';
}

export default function EmptyDiary({
  info,
  addInfo,
  className,
}: EmptyDiaryProps) {
  const router = useRouter();

  const { modalOpen, setModalCategory, isOwner } = useLeafStore();

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
          `w-full pt-6 pb-5 flex flex-col gap-[1.1rem] justify-center items-center max-w-[414px] h-[137px] bg-brown-10 border-2 border-brown-50 rounded-lg shadow-outer/down`,
          className,
        )}>
        <div className="flex flex-col gap-2 text-center">
          <p className="font-bold text-[1.25rem] text-brown-70 break-words px-3 max-[460px]:pt-2 break-keep leading-6 max-[401px]:text-[15px]">
            {INFOMATION_TEXT[info]}
          </p>
          {isOwner && addInfo && (
            <p className=" font-bold text-[1rem] text-brown-50">
              {INFOMATION_TEXT[addInfo]}
            </p>
          )}
        </div>
        {isOwner && displayAddButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-[6px] mb-2 bg-[url('/assets/img/bg_wood_dark.png')] bg-contain border-2 border-brown-70 rounded-lg shadow-outer/down text-base font-bold text-brown-10"
            onClick={info === 'diary' ? addDiary : goToAddPost}>
            작성하기
          </motion.button>
        )}
      </div>
    </div>
  );
}
