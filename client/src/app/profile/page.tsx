'use client';

import useSignModalStore from '@/stores/signModalStore';

import ProfileBox from '@/components/profile/ProfileBox';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import ChangeNicknameModal from '@/components/profile/ChangeNicknameModal';

export default function Profile() {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <div className="flex justify-center items-center h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')] pt-[120px]">
      <ProfileBox />

      {currentState === 'ChangePasswordModal' && <ChangePasswordModal />}
      {currentState === 'ChangeNicknameModal' && <ChangeNicknameModal />}
    </div>
  );
}
