'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import useLeafsStore from '@/stores/leafsStore';
import useLeafStore from '@/stores/leafStore';
import useGardenModalStore from '@/stores/gardenModalStore';

import CommonButton from './CommonButton';

import { DefaultProps } from '@/types/common';

interface ShareButtonProps extends DefaultProps {
  location: 'leafs' | 'leaf' | 'garden';
  position: 'top' | 'bottom';
}

export default function ShareButton({
  location,
  position,
  className,
}: ShareButtonProps) {
  const url = usePathname();

  /** 사용된 장소가 식물 카드 관련 페이지 인지 */
  const isLeafs = location === 'leaf' || location === 'leafs';

  const { modalOpen: leafsModalOpen, setModalCategory: setLeafsModalCategory } =
    useLeafsStore();

  const { modalOpen: leafModalOpen, setModalCategory: setLeafModalCategory } =
    useLeafStore();

  const { open: gardenModalOpen, changeType } = useGardenModalStore();

  const handleShareUrl = () => {
    const base = 'https://grow-story.vercel.app';
    const links = base + url;

    navigator.clipboard.writeText(links);

    if (location === 'leafs') {
      setLeafsModalCategory('share');
      leafsModalOpen();
    }

    if (location === 'leaf') {
      setLeafModalCategory('share');
      leafModalOpen();
    }

    if (location === 'garden') {
      changeType('share');
      gardenModalOpen();
    }
  };

  if (isLeafs && position === 'top')
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={twMerge(
          'absolute top-[36px] right-[36px] w-[40px] h-[40px] bg-brown-50 rounded-[50%] border-2 border-brown-70 shadow-outer/down max-[590px]:hidden',
          className,
        )}
        onClick={handleShareUrl}>
        <Image
          className="relative left-[10px]"
          src="/assets/icon/share.svg"
          width={16}
          height={18}
          alt="공유하기"
        />
      </motion.button>
    );
  if (isLeafs && position === 'bottom')
    return (
      <CommonButton
        size="md"
        type="button"
        onClick={handleShareUrl}
        className="hidden w-fit max-[590px]:inline">
        공유하기
      </CommonButton>
    );
  if (!isLeafs && position === 'top')
    return (
      <button
        type="button"
        onClick={handleShareUrl}
        className="absolute right-[0px] flex items-center gap-[6px] min-w-max h-fit px-3 py-2 text-lg text-brown-70 font-bold border-8 border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-6 max-[480px]:hidden">
        공유하기
      </button>
    );
  if (!isLeafs && position === 'bottom')
    return (
      <CommonButton
        size="md"
        type="button"
        onClick={handleShareUrl}
        className={'hidden w-fit max-[480px]:inline'}>
        공유하기
      </CommonButton>
    );
}
