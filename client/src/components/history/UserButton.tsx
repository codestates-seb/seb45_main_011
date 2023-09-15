'use client';

import { useRouter } from 'next/navigation';

import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';

export default function UserButton() {
  const router = useRouter();

  const changeState = useSignModalStore((state) => state.changeState);

  const handleResignModal = () => {
    changeState('ResignModal');
  };

  return (
    <>
      <CommonButton
        type="button"
        size="md"
        className="w-[121px] h-[44px] hover:scale-105 transition-transform"
        onProfile={() => router.push('/profile')}>
        정보 수정
      </CommonButton>
      <CommonButton
        type="button"
        size="md"
        className="w-[121px] h-[44px] hover:scale-105 transition-transform"
        onOpen={() => handleResignModal()}>
        회원 탈퇴
      </CommonButton>
    </>
  );
}
