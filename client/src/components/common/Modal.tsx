'use client';

import { useEffect } from 'react';

import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import useModalStore from '@/stores/modalStore';

import Screws from './Screws';

import { DefaultProps } from '@/types/common';

interface ModalProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Modal({ children, className }: ModalProps) {
  const { close, type } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const handleClick = () => close();

  return (
    <>
      <div
        aria-hidden
        onClick={() => {
          handleClick();
        }}
        className="fixed top-0 left-0 w-screen h-screen bg-black-30/[.9] backdrop-blur-sm z-50"
      />
      <motion.main
        initial={{ x: '-50%', y: '-50%', scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={twMerge(
          `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl bg-repeat ${
            type !== 'ChatModal' && 'border-gradient shadow-container'
          } z-50`,
          className,
        )}>
        {children}
        {type !== 'ChatModal' && <Screws />}
      </motion.main>
    </>
  );
}
