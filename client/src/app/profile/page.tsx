'use client';

import { notFound } from 'next/navigation';

import { motion } from 'framer-motion';

import useSignModalStore from '@/stores/signModalStore';
import useUserStore from '@/stores/userStore';

import ProfileBox from '@/components/profile/ProfileBox';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import ChangeNicknameModal from '@/components/profile/ChangeNicknameModal';
import ConfirmModal from '@/components/history/ConfirmModal';
import ResignModal from '@/components/history/ResignModal';
import FailureModal from '@/components/history/FailureModal';
import SuccessedModal from '@/components/history/SuccessedModal';
import Footer from '@/components/common/Footer';

import { ADMIN_USER_ID, MOUNT_ANIMATION_VALUES } from '@/constants/values';
import useEffectOnce from '@/hooks/useEffectOnce';

export default function Profile() {
  const currentState = useSignModalStore((state) => state.currentState);
  const { userId } = useUserStore();

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

        {currentState === 'ChangePasswordModal' && <ChangePasswordModal />}
        {currentState === 'ChangeNicknameModal' && <ChangeNicknameModal />}
        {currentState === 'ConfirmModal' && <ConfirmModal />}
        {currentState === 'ResignModal' && <ResignModal />}
        {currentState === 'FailureModal' && <FailureModal />}
        {currentState === 'SuccessedModal' && <SuccessedModal />}
      </motion.div>
      <Footer />
    </>
  );
}
