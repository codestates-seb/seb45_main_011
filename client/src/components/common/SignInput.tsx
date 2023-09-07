'use client';

import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';
import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import { useRef } from 'react';

interface SignInputProps {
  type: 'email' | 'pw' | 'pwCheck' | 'nickname';
  input: 'text' | 'pw';
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export default function SignInput({
  type,
  input,
  register,
  errors,
  watch,
}: SignInputProps) {
  const errorMsg = errors[type]?.message as string;

  const pwRef = useRef<string | null>(null);
  pwRef.current = watch('pw');

  const getPatternByType = (type: string) => {
    if (type === 'email') {
      return {
        value: /\S+@\S+\.\S+/,
        message: SIGNIN_VAILDATION[type],
      };
    }

    if (type === 'pw') {
      return {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        message: SIGNIN_VAILDATION[type],
      };
    }

    if (type === 'nickname') {
      return {
        value: /^[가-힣a-zA-Z]+$/,
        message: SIGNIN_VAILDATION[type],
      };
    }

    return null;
  };

  const getMinLengthByType = (type: string) => {
    if (type === 'pw') {
      return {
        value: 6,
        message: SIGNIN_VAILDATION[type],
      };
    }

    //! 후에 수정할 미래를 예비하기 위해서 미리 만들어둔다(수정이 쉬운 코드)
    if (type === 'pwCheck') {
      return {
        value: 6,
        message: SIGNIN_VAILDATION[type],
      };
    }

    if (type === 'nickname') {
      return {
        value: 2,
        message: SIGNIN_VAILDATION[type],
      };
    }

    return null;
  };

  const getValidateByType = (type: string, value: string) => {
    if (type === 'pwCheck') {
      return {
        message: (value: string) =>
          value !== pwRef.current && SIGNIN_VAILDATION[type],
      };
    }

    return null;
  };

  const pattern = getPatternByType(type) as any;
  const minLength = getMinLengthByType(type) as any;
  const validate = getValidateByType(type, 'test1234') as any;

  return (
    <div className="flex flex-col">
      <input
        type={SIGNIN_INPUT_TYPE[input]}
        className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[type]} leading-[12px] outline-none shadow-outer/down`}
        placeholder={SIGNIN_REQUIRE[type]}
        {...register(type, {
          pattern,
          minLength,
          validate,
        })}
      />
      {errors[type] && (
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errorMsg}
        </div>
      )}
    </div>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  nickname: `bg-[url('/assets/icon/nickname.svg')]`,
  pw: `bg-[url('/assets/icon/pw.svg')]`,
  pwCheck: `bg-[url('/assets/icon/pw_check.svg')]`,
};

const SIGNIN_INPUT_TYPE = {
  text: 'text',
  pw: 'password',
} as const;
