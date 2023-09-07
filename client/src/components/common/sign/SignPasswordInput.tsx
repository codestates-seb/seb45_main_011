'use client';

import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  RegisterOptions,
} from 'react-hook-form';

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
  const errorMsg = errors[tag]?.message as string;

  const getRegisterByType = (
    tag: string,
    watch?: UseFormWatch<SignFormValue>,
  ) => {
    if (tag === 'password') {
      return {
        validation: {
          required: true,
          minLenght: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
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
    <div className="flex flex-col">
      <input
        type="password"
        className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG[tag]} leading-[12px] outline-none shadow-outer/down`}
        placeholder={SIGNIN_REQUIRE[tag]}
        // html required 사용 권장!
        required
        {...register(tag, registerFormat?.validation)}
        disabled={disabled}
      />
      {errors[tag] && (
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errorMsg}
        </div>
      )}
    </div>
  );
}

const SIGN_INPUT_BG = {
  password: `bg-[url('/assets/icon/pw.svg')]`,
  passwordCheck: `bg-[url('/assets/icon/pw_check.svg')]`,
};
