'use client';

import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import Screws from './Screws';

import { DefaultProps } from '@/types/common';

interface ModalProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Modal({ children, className }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
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
