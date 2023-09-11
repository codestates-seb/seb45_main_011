'use client';

import useUserStore from '@/stores/userStore';

import ImageForm from './ImageForm';
import NicknameForm from './NicknameForm';
import PasswordForm from './PasswordForm';

import Screws from '../common/Screws';

export default function ProfileForm() {
  const token = useUserStore((state) => state.accessToken);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[560px] h-[518px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <ImageForm token={token} />
      <div className="w-full flex flex-col items-center ml-4">
        <NicknameForm token={token} />
        <PasswordForm token={token} />
      </div>
    </div>
  );
}
