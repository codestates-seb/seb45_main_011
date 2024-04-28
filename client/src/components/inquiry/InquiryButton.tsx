'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import useNotificationStore from '@/stores/notificationStore';
import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import useClient from '@/hooks/useClient';

import { InquiryForm } from '.';

export default function InquiryButton() {
  const { userId } = useUserStore();
  const { isClicked } = useNotificationStore();

  const { isOpen, setIsOpen } = useChatStore();

  const isClient = useClient();

  useEffect(() => {
    if (isClicked) {
      setIsOpen(false);
    }
  }, [isClicked]);

  return (
    userId &&
    isClient && (
      <div className="fixed z-20 right-4 bottom-5">
        <button
          className="w-12 h-12 border-[3px] border-brown-70 rounded-[50%] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat flex justify-center items-center shadow-outer/down"
          onClick={() => setIsOpen(!isOpen)}>
          <Image
            src="/assets/icon/qna.svg"
            alt="문의 버튼"
            width={22}
            height={26}
          />
        </button>

        {isOpen && <InquiryForm />}
      </div>
    )
  );
}
