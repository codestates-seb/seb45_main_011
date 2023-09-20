'use client';

import useUserStore from '@/stores/userStore';
import useSignModalStore from '@/stores/signModalStore';

import ImageForm from './ImageForm';
import NicknameForm from './NicknameForm';
import PasswordForm from './PasswordForm';

import Screws from '../common/Screws';
import CommonButton from '../common/CommonButton';

import { ADMIN_USER_ID } from '@/constants/values';

export default function ProfileBox() {
  const { userId, isGoogleLogin } = useUserStore();
  const changeState = useSignModalStore((state) => state.changeState);

  const handleResignModal = () => {
    isGoogleLogin ? changeState('ConfirmModal') : changeState('ResignModal');
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-full min-w-[312px] max-w-[560px] h-full rounded-xl shadow-container border-gradient mb-[60px]">
      <Screws />
      <ImageForm className="mt-8" />

      <div className="w-full flex flex-col items-center mb-4">
        <NicknameForm />
        {!isGoogleLogin && <PasswordForm />}
        {userId !== ADMIN_USER_ID && (
          <CommonButton
            type="button"
            size="md"
            onClick={handleResignModal}
            className="my-3">
            {isGoogleLogin ? '연결 해제' : '회원 탈퇴'}
          </CommonButton>
        )}
      </div>
    </div>
  );
}
