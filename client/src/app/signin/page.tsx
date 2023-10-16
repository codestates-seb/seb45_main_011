'use client';

import { motion } from 'framer-motion';

import useModalStore, { ModalType } from '@/stores/modalStore';

import {
  SigninIntro,
  FindPasswordModal,
  SuccessedModal,
  FailureModal,
} from '@/components/signin';

export default function Signin() {
  const { isOpen, type } = useModalStore();

  const renderModal = (type: ModalType) => {
    if (type === 'FindPasswordModal') return <FindPasswordModal />;
    if (type === 'SuccessedModal') return <SuccessedModal />;
    if (type === 'FailureModal') return <FailureModal />;
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-full mx-4 pb-[40px]">
      <SigninIntro />

      {isOpen && renderModal(type)}
    </motion.div>
  );
}
