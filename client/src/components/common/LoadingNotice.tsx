'use client';

import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import LoadingMessage from './LoadingMessage';
import Screws from './Screws';

import { DefaultProps } from '@/types/common';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface LoadingNoticeProps extends DefaultProps {
  isTransparent: boolean;
}

export default function LoadingNotice({
  isTransparent,
  className,
}: LoadingNoticeProps) {
  return (
    <>
      {isTransparent ? (
        <motion.div
          variants={MOUNT_ANIMATION_VALUES}
          initial="initial"
          animate="animate"
          className={className}>
          <LoadingMessage />
        </motion.div>
      ) : (
        <motion.div
          variants={MOUNT_ANIMATION_VALUES}
          initial="initial"
          animate="animate"
          className={twMerge(
            'relative flex justify-center items-center w-[280px] h-[240px] border-gradient rounded-xl bg-repeat shadow-outer/down',
            className,
          )}>
          <LoadingMessage />
          <Screws />
        </motion.div>
      )}
    </>
  );
}
