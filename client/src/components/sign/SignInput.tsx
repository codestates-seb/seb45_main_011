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
          maxLength: {
            value: 6,
            message: '6글자 이하의 영문 또는 한글을 입력해야 합니다.',
          },
        },
      };
    }

    return null;
  };

  const registerFormat = getRegisterByType(type);

  return (
    <div className="flex flex-col max-[420px]:mx-5">
      <input
        type={type}
        autoComplete="off"
        className={`pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[type]} leading-[12px] outline-none shadow-outer/down min-[420px]:min-w-[300px]`}
        placeholder={SIGNIN_REQUIRE[type]}
        disabled={disabled}
        required
        {...register(type, registerFormat?.validation)}
      />

      <div className="h-[12px] mt-[8px] pl-[38px] w-full text-[0.6rem] leading-3 text-red-50">
        {errorMsg}
      </div>
    </div>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  nickname: `bg-[url('/assets/icon/nickname.svg')]`,
};
