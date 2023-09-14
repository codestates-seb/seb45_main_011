'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';

import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';

import { SignFormValue } from '@/types/common';

interface SignPasswordInputProps {
  tag: 'password' | 'passwordCheck';
  register: UseFormRegister<SignFormValue>;
  errors: FieldErrors<SignFormValue>;
  watch: UseFormWatch<SignFormValue>;
  disabled?: boolean;
}

export default function SignPasswordInput({
  tag,
  register,
  errors,
  watch,
  disabled,
}: SignPasswordInputProps) {
  const errorMsg = errors[tag]?.message;

  const getRegisterByType = (
    tag: string,
    watch?: UseFormWatch<SignFormValue>,
  ) => {
    if (tag === 'password') {
      return {
        validation: {
          required: true,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
            message: SIGNIN_VAILDATION[tag],
          },
        },
      };
    }

    if (tag === 'passwordCheck' && watch) {
      return {
        validation: {
          required: true,
          validate: (value: string) =>
            value === watch('password') || SIGNIN_VAILDATION[tag],
        },
      };
    }

    return null;
  };

  const registerFormat = getRegisterByType(tag, watch);

  return (
    <div className="flex flex-col max-[420px]:mx-5">
      <input
        type="password"
        className={`pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[tag]} leading-[12px] outline-none shadow-outer/down min-[420px]:min-w-[300px]`}
        placeholder={SIGNIN_REQUIRE[tag]}
        disabled={disabled}
        required
        {...register(tag, registerFormat?.validation)}
      />

      <div className="h-[12px] mt-[8px] pl-[38px] w-full text-[0.6rem] leading-3 text-red-50">
        {errorMsg}
      </div>
    </div>
  );
}

const SIGN_INPUT_BG = {
  password: `bg-[url('/assets/icon/pw.svg')]`,
  passwordCheck: `bg-[url('/assets/icon/pw_check.svg')]`,
};
