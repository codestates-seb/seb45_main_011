'use client';

import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import ErrorMessage from './ErrorMessage';
import Screws from './Screws';

import { DefaultProps } from '@/types/common';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface ErrorNoticeProps extends DefaultProps {
  isTransparent: boolean;
}

export default function ErrorNotice({
  isTransparent,
  className,
}: ErrorNoticeProps) {
  return (
    <>
      {isTransparent ? (
        <motion.div
          variants={MOUNT_ANIMATION_VALUES}
          initial="initial"
          animate="animate"
          className={className}>
          <ErrorMessage />
        </motion.div>
      ) : (
        <motion.div
          variants={MOUNT_ANIMATION_VALUES}
          initial="initial"
          animate="animate"
          className={twMerge(
            'relative flex justify-center items-center w-[328px] h-[240px] border-gradient rounded-xl bg-repeat shadow-outer/down',
            className,
          )}>
          <ErrorMessage />
          <Screws />
        </motion.div>
      )}
    </>
  );
}
