'use client';

import { motion } from 'framer-motion';

import useSignModalStore from '@/stores/signModalStore';

import AuthEmailModal from '@/components/signup/AuthEmailModal';
import FailureModal from '@/components/signup/FailureModal';
import SignupIntro from '@/components/signup/SignupIntro';

export default function Signup() {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-full mx-4">
      <SignupIntro />

      {currentState === 'AuthEmailModal' && <AuthEmailModal />}
      {currentState === 'Not Code' && <FailureModal />}
    </motion.div>
  );
}
