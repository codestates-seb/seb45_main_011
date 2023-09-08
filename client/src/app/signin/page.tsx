'use client';

import useSignModalStore from '@/stores/signModalStore';

import SigninIntro from '@/components/signin/SigninIntro';

import FindPasswordModal from '@/components/signin/FindPasswordModal';
import SuccessedModal from '@/components/signin/SuccessedModal';
import FailureModal from '@/components/signin/FailureModal';

export default function Signin() {
  const { currentState } = useSignModalStore();

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/img/bg_default.png')] bg-contain">
      <SigninIntro />

      {currentState === 'FindPasswordModal' && <FindPasswordModal />}
      {currentState === 'SuccessedModal' && <SuccessedModal />}
      {currentState === 'FailureModal' && <FailureModal />}
    </div>
  );
}
