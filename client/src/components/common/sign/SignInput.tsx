'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import { SignFormValue } from '@/types/common';

interface SignInputProps {
  type: 'email' | 'nickname';
  register: UseFormRegister<SignFormValue>;
  errors: FieldErrors<SignFormValue>;
  disabled?: boolean;
}

export default function SignInput({
  type,
  register,
  errors,
  disabled,
}: SignInputProps) {
  const errorMsg = errors[type]?.message;

  const getRegisterByType = (type: string) => {
    if (type === 'email') {
      return {
        validation: {
          required: true,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: SIGNIN_VAILDATION[type],
          },
        },
      };
    }

    if (type === 'nickname') {
      return {
        validation: {
          required: true,
          pattern: {
            value: /^[가-힣a-zA-Z]+$/,
            message: SIGNIN_VAILDATION.nickname,
          },
          minLength: {
            value: 2,
            message: SIGNIN_VAILDATION.nickname,
          },
        },
      };
    }

    return null;
  };

  const registerFormat = getRegisterByType(type);

  return (
    <div className="flex flex-col">
      <input
        type={type}
        autoComplete="off"
        className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[type]} leading-[12px] outline-none shadow-outer/down`}
        placeholder={SIGNIN_REQUIRE[type]}
        {...register(type, registerFormat?.validation)}
        disabled={disabled}
        required
      />
      {errors[type] && (
        <div className="text-[10px] text-red-50 leading-3 ml-10 mt-2">
          {errorMsg}
        </div>
      )}
    </div>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  nickname: `bg-[url('/assets/icon/nickname.svg')]`,
};
