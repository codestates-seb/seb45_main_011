'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import { SIGN_REQUIRE } from '@/constants/contents';

import getPasswordByType from '@/utils/getPasswordByType';

interface SignPasswordInputProps {
  tag: 'password' | 'passwordCheck';

  register: UseFormRegister<SignFormValue>;
  watch: UseFormWatch<SignFormValue>;
  errors: FieldErrors<SignFormValue>;

  disabled?: boolean;
}

export default function SignPasswordInput({
  tag,
  register,
  watch,
  errors,
  disabled,
}: SignPasswordInputProps) {
  const passwordFormat = getPasswordByType(tag, watch);

  const errorMsg = errors[tag]?.message;

  return (
    <section className="flex flex-col max-[420px]:mx-5">
      <input
        type="password"
        className={`pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[tag]} leading-[12px] outline-none shadow-outer/down min-[420px]:min-w-[300px]`}
        placeholder={SIGN_REQUIRE[tag]}
        disabled={disabled}
        required
        {...register(tag, passwordFormat?.validation)}
      />

      <div className="h-[12px] mt-[8px] pl-[38px] w-full text-[0.6rem] leading-3 text-red-50">
        {errorMsg}
      </div>
    </section>
  );
}

const SIGN_INPUT_BG = {
  password: `bg-[url('/assets/icon/pw.svg')]`,
  passwordCheck: `bg-[url('/assets/icon/pw_check.svg')]`,
};
