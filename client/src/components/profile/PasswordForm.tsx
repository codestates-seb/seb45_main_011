'use client';

import { useForm } from 'react-hook-form';

import { updateUserPassword } from '@/api/profile';

import PasswordInput from '../common/PasswordInput';
import CommonButton from '../common/CommonButton';

import { InputValues } from '@/types/common';

type Token = {
  token: string;
};

export default function PasswordForm({ token }: Token) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<InputValues>();

  const presentPassword = watch('password');
  const changedPassword = watch('newPasswordCheck');

  const updatePassword = () => {
    if (!presentPassword && !changedPassword) return;

    if (presentPassword === changedPassword) {
      alert('기존 비밀번호와 동일합니다. 새로운 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      updateUserPassword(presentPassword, changedPassword, token);
      reset();
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className="relative w-full flex flex-col items-center">
      <div className="w-[94%] flex">
        <label className="text-[20px] text-brown-80 font-bold pt-2">
          기존 비밀번호 :&nbsp;
        </label>
        <PasswordInput
          name="password"
          register={register}
          errors={errors}
          watch={watch}
          password={presentPassword}
        />
      </div>
      <div className="w-[86.5%] flex">
        <label className="text-[20px] text-brown-80 font-bold pt-2">
          새 비밀번호 :&nbsp;
        </label>
        <PasswordInput name="newPassword" register={register} errors={errors} />
      </div>
      <div className="w-[94%] flex">
        <label className="text-[20px] text-brown-80 font-bold pt-2">
          비밀번호 확인 :&nbsp;
        </label>
        <PasswordInput
          name="newPasswordCheck"
          register={register}
          errors={errors}
          watch={watch}
        />
        <div className="mt-[2px]">
          <CommonButton
            type="submit"
            size="sm"
            children="변경"
            className="w-[52px] h-8 ml-2"
          />
        </div>
      </div>
    </form>
  );
}
