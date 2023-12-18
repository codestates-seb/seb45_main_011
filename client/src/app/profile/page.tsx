'use client';

import { createPortal } from 'react-dom';
import { notFound } from 'next/navigation';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';
import useModalStore, { ModalType } from '@/stores/modalStore';

import useEffectOnce from '@/hooks/useEffectOnce';
import useModal from '@/hooks/useModal';

import { ProfileBox, ChangeProfileModal } from '@/components/profile';
import {
  ResignModal,
  ConfirmModal,
  SuccessedModal,
  FailureModal,
} from '@/components/history';
import { InquiryButton } from '@/components/inquiry';
import { Footer } from '@/components/common';

import { ADMIN_USER_ID, MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function Profile() {
  const { userId } = useUserStore();
  const { isOpen, type } = useModalStore();

  const { portalElement } = useModal(isOpen);

  const renderModal = (type: ModalType) => {
    if (type === 'ChangePasswordModal')
      return <ChangeProfileModal type="password" />;
    if (type === 'ChangeNicknameModal')
      return <ChangeProfileModal type="nickname" />;
    if (type === 'ChangeImageModal') return <ChangeProfileModal type="image" />;

    if (type === 'ResignModal') return <ResignModal />;
    if (type === 'ConfirmModal') return <ConfirmModal />;
    if (type === 'SuccessedModal') return <SuccessedModal />;
    if (type === 'FailureModal') return <FailureModal />;
  };

  useEffectOnce(() => {
    userId === ADMIN_USER_ID && notFound();
  });

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex flex-col justify-center items-center h-auto min-h-full pb-[343px] mx-4">
        <ProfileBox />

        {isOpen && portalElement
          ? createPortal(renderModal(type), portalElement)
          : null}
      </motion.div>

      <InquiryButton />
      <Footer />
    </>
  );
}
