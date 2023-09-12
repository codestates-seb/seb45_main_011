'use client';

import useSignModalStore from '@/stores/signModalStore';

import AuthEmailModal from '@/components/signup/AuthEmailModal';
import FailureModal from '@/components/signup/FailureModal';
import SignupIntro from '@/components/signup/SignupIntro';

export default function Signup() {
  const { currentState } = useSignModalStore();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <SignupIntro />

      {currentState === 'AuthEmailModal' && <AuthEmailModal />}
      {currentState === 'Not Code' && <FailureModal />}
    </div>
  );
}
