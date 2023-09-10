'use client';

import { useForm } from 'react-hook-form';

import usePesistStore from '@/stores/persistStore';

import NicknameForm from './NicknameForm';
import PasswordForm from './PasswordForm';

import ImageInput from '../common/ImageInput';
import Screws from '../common/Screws';

import { InputValues } from '@/types/common';

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<InputValues>();

  const { accessToken } = usePesistStore();

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[560px] h-[518px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <ImageInput token={accessToken} />
      <div className="w-full flex flex-col items-center ml-4">
        <NicknameForm token={accessToken} />
        <PasswordForm token={accessToken} />
      </div>
    </div>
  );
}
