'use client';

import { motion } from 'framer-motion';

import useSignModalStore from '@/stores/signModalStore';

import ProfileBox from '@/components/profile/ProfileBox';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import ChangeNicknameModal from '@/components/profile/ChangeNicknameModal';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function Profile() {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <motion.div
      variants={MOUNT_ANIMATION_VALUES}
      initial="initial"
      animate="animate"
      className="flex flex-col justify-center items-center mx-4">
      <ProfileBox />

      {currentState === 'ChangePasswordModal' && <ChangePasswordModal />}
      {currentState === 'ChangeNicknameModal' && <ChangeNicknameModal />}
    </motion.div>
  );
}
