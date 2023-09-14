'use client';

import useSignModalStore from '@/stores/signModalStore';

import SigninIntro from '@/components/signin/SigninIntro';
import FindPasswordModal from '@/components/signin/FindPasswordModal';
import SuccessedModal from '@/components/signin/SuccessedModal';
import FailureModal from '@/components/signin/FailureModal';

export default function Signin() {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <SigninIntro />

      {currentState === 'FindPasswordModal' && <FindPasswordModal />}
      {currentState === 'SuccessedModal' && <SuccessedModal />}
      {currentState === 'FailureModal' && <FailureModal />}
    </div>
  );
}
