import { UseFormRegister } from 'react-hook-form';

import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';

import { SignFormValue } from '@/types/common';

interface SignModalInputProps {
  type: 'code' | 'email' | 'password';
  register: UseFormRegister<SignFormValue>;
}

export default function SignModalInput({
  type,
  register,
}: SignModalInputProps) {
  const getRegisterByType = (type: string) => {
    if (type === 'code') {
      return {
        validation: {
          required: '올바른 인증번호를 입력해주세요.',
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/,
            message: SIGNIN_VAILDATION[type],
          },
        },
      };
    }

    if (type === 'email') {
      return {
        validation: {
          required: '올바른 이메일을 입력해주세요.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: SIGNIN_VAILDATION[type],
          },
        },
      };
    }

    if (type === 'password') {
      return {
        validation: {
          required: true,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
            message: SIGNIN_VAILDATION[type],
          },
        },
      };
    }

    return null;
  };

  const registerFormat = getRegisterByType(type);

  return (
    <>
      <input
        type={type}
        autoComplete="off"
        className={`w-full max-w-[300px] pl-4 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-[50px] bg-[center_left_12px] bg-no-repeat leading-[12px] outline-none shadow-outer/down max-[705px]:py-[6px]`}
        placeholder={SIGNIN_REQUIRE[type]}
        required
        {...register(type, registerFormat?.validation)}
      />
    </>
  );
}
