'use client';
import { createPortal } from 'react-dom';

import { motion } from 'framer-motion';

import useModalStore, { ModalType } from '@/stores/modalStore';

import useModal from '@/hooks/useModal';

import {
  AuthEmailModal,
  MembershipCheckModal,
  FailureModal,
  SignupIntro,
} from '@/components/signup';

export default function Signup() {
  const { isOpen, type } = useModalStore();

  const { portalElement } = useModal(isOpen);

  const renderModal = (type: ModalType) => {
    if (type === 'AuthEmailModal') return <AuthEmailModal />;
    if (type === 'FailureModal') return <FailureModal />;
    if (type === 'MembershipCheckModal') return <MembershipCheckModal />;
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center h-full mx-4 pb-[40px]">
      <SignupIntro />

      {isOpen && portalElement
        ? createPortal(renderModal(type), portalElement)
        : null}
    </motion.div>
  );
}
