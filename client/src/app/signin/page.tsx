'use client';

import { motion } from 'framer-motion';

import useSignModalStore from '@/stores/signModalStore';

import SigninIntro from '@/components/signin/SigninIntro';
import FindPasswordModal from '@/components/signin/FindPasswordModal';
import SuccessedModal from '@/components/signin/SuccessedModal';
import FailureModal from '@/components/signin/FailureModal';

export default function Signin() {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-full mx-4">
      <SigninIntro />

      {currentState === 'FindPasswordModal' && <FindPasswordModal />}
      {currentState === 'SuccessedModal' && <SuccessedModal />}
      {currentState === 'FailureModal' && <FailureModal />}
    </motion.div>
  );
}
