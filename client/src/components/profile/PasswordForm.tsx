'use client';

import { useForm } from 'react-hook-form';

import useChangePassword from '@/hooks/useChagnePassword';

import { CommonButton, PasswordInput } from '../common';

import { InputValues } from '@/types/common';

export default function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<InputValues>();

  const presentPassword = watch('password');
  const changedPassword = watch('newPasswordCheck');

  const { updatePassword } = useChangePassword(
    presentPassword,
    changedPassword,
  );

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className="relative w-fit flex flex-col justify-center items-center">
      <div className="w-fit flex max-[580px]:flex-col">
        <label
          htmlFor="password"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2 whitespace-nowrap max-[580px]:p-0 max-[580px]:pb-3">
          기존 비밀번호 :
        </label>
        <PasswordInput
          name="password"
          register={register}
          errors={errors}
          password={presentPassword}
          className="w-[244px] mr-14 max-[420px]:w-[200px]"
        />
      </div>
      <div className="w-fit flex max-[580px]:flex-col">
        <label
          htmlFor="newPassword"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2 whitespace-nowrap max-[580px]:p-0 max-[580px]:pb-3">
          새 비밀번호 :
        </label>
        <PasswordInput
          name="newPassword"
          register={register}
          errors={errors}
          className="w-[244px] mr-[38px] max-[580px]:mr-14 max-[420px]:w-[200px]"
        />
      </div>
      <div className="w-fit flex max-[580px]:flex-col">
        <label
          htmlFor="newPasswordCheck"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2 whitespace-nowrap max-[580px]:p-0 max-[580px]:pb-3">
          비밀번호 확인 :
        </label>
        <div className="flex">
          <PasswordInput
            name="newPasswordCheck"
            register={register}
            errors={errors}
            watch={watch}
            className="w-[244px] max-[420px]:w-[200px]"
          />
          <div className="mt-[2px]">
            <CommonButton
              type="submit"
              size="sm"
              className="w-[52px] h-8 ml-2"
              disabled={isSubmitting}>
              변경
            </CommonButton>
          </div>
        </div>
      </div>
    </form>
  );
}
