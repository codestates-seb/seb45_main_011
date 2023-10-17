'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { CommonButton } from '../common';

export default function UserButton() {
  const router = useRouter();

  const { isGoogleLogin } = useUserStore();
  const { changeType, open } = useModalStore();

  const handleResignModal = () => {
    open();
    isGoogleLogin ? changeType('ConfirmModal') : changeType('ResignModal');
  };

  return (
    <>
      <CommonButton
        type="button"
        size="md"
        className="w-[121px] h-[44px]"
        onProfile={() => router.push('/profile')}>
        정보 수정
      </CommonButton>

      <CommonButton
        type="button"
        size="md"
        className="w-[121px] h-[44px]"
        onOpen={() => handleResignModal()}>
        {isGoogleLogin ? '연결 해제' : '회원 탈퇴'}
      </CommonButton>
    </>
  );
}
