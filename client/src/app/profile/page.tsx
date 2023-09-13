'use client';

import useSignModalStore from '@/stores/signModalStore';

import ProfileBox from '@/components/profile/ProfileBox';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import ChangeNicknameModal from '@/components/profile/ChangeNicknameModal';

export default function Profile() {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/img/bg_default.png')] bg-contain">
      <ProfileBox />

      {currentState === 'ChangePasswordModal' && <ChangePasswordModal />}
      {currentState === 'ChangeNicknameModal' && <ChangeNicknameModal />}
    </div>
  );
}
