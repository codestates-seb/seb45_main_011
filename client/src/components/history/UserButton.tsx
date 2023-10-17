'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';

export default function UserButton() {
  const router = useRouter();

  const { isGoogleLogin } = useUserStore();
  const changeState = useSignModalStore((state) => state.changeState);

  const handleResignModal = () => {
    isGoogleLogin ? changeState('ConfirmModal') : changeState('ResignModal');
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
