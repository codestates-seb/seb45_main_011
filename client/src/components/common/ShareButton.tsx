'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import useModalStore from '@/stores/modalStore';

import { CommonButton } from '@/components/common';

import { DefaultProps } from '@/types/common';

import { SHARE_URL } from '@/constants/values';
import { SHARE_BUTTON_TEXT } from '@/constants/contents';

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

  const { open, changeType } = useModalStore();

  const isLeafs = location === 'leaf' || location === 'leafs';

  const handleShareUrl = () => {
    const base = SHARE_URL;
    const links = base + url;

    navigator.clipboard.writeText(links);

    changeType('share');
    open();
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
          alt={SHARE_BUTTON_TEXT.button}
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
        {SHARE_BUTTON_TEXT.button}
      </CommonButton>
    );

  if (!isLeafs && position === 'top')
    return (
      <button
        type="button"
        onClick={handleShareUrl}
        className="absolute right-[0px] flex items-center gap-[6px] min-w-max h-fit px-3 py-2 text-lg text-brown-70 font-bold border-8 border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-6 max-[480px]:hidden">
        {SHARE_BUTTON_TEXT.button}
      </button>
    );

  if (!isLeafs && position === 'bottom')
    return (
      <CommonButton
        size="md"
        type="button"
        onClick={handleShareUrl}
        className={'hidden w-fit max-[480px]:inline'}>
        {SHARE_BUTTON_TEXT.button}
      </CommonButton>
    );
}
