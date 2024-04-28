'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import { SIGN_REQUIRE } from '@/constants/contents';

import getRegisterByType from '@/utils/getRegisterByType';

interface SignTextInputProps {
  type: 'email' | 'nickname';

  register: UseFormRegister<SignFormValue>;
  errors: FieldErrors<SignFormValue>;

  disabled?: boolean;
}

export default function SignTextInput({
  type,
  register,
  errors,
  disabled,
}: SignTextInputProps) {
  const registerFormat = getRegisterByType(type);

  const errorMsg = errors[type]?.message;

  return (
    <div className="flex flex-col max-[420px]:mx-5">
      <input
        type={type}
        autoComplete="off"
        className={`pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[type]} leading-[12px] outline-none shadow-outer/down min-[420px]:min-w-[300px]`}
        placeholder={SIGN_REQUIRE[type]}
        disabled={disabled}
        required
        {...register(type, registerFormat?.validation)}
      />

      <p className="h-[12px] mt-[8px] pl-[38px] w-full text-[0.6rem] leading-3 text-red-50">
        {errorMsg}
      </p>
    </div>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  nickname: `bg-[url('/assets/icon/nickname.svg')]`,
};
