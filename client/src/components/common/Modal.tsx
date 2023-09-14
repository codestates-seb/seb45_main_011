'use client';

import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import Screws from './Screws';

import { DefaultProps } from '@/types/common';
import useGardenModalStore from '@/stores/gardenModalStore';
import usePostModalStore from '@/stores/postModalStore';
import useSignModalStore from '@/stores/signModalStore';
import useLeafStore from '@/stores/leafStore';
import useLeafsStore from '@/stores/leafsStore';

interface ModalProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Modal({ children, className }: ModalProps) {
  const { close: gardenModalClose } = useGardenModalStore();
  const { close: postModalClose } = usePostModalStore();
  const { close: signModalClose } = useSignModalStore();
  const { modalClose: leafModalClose } = useLeafStore();
  const { modalClose: leafsModalClose } = useLeafsStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const handleClick = () => {
    gardenModalClose();
    postModalClose();
    signModalClose();
    leafModalClose();
    leafsModalClose();
  };

  return (
    <>
      <div
        aria-hidden
        onClick={handleClick}
        className="fixed top-0 left-0 w-screen h-screen bg-black-30/[.9] backdrop-blur-sm z-40"
      />
      <main
        className={twMerge(
          `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gradient rounded-xl bg-repeat shadow-outer/down z-50`,
          className,
        )}>
        {children}
        <Screws />
      </main>
    </>
  );
}
