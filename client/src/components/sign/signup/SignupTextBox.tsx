'use cilent';

import { useRef } from 'react';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import CommonButton from '@/components/common/CommonButton';
import { SignupFormValue } from '@/types/common';

export default function SignupTextBox() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValue>();

  // Submit Button
  const handleOnSubmit: SubmitHandler<SignupFormValue> = (data) => {
    // 모든 항목이 정상적으로 입력되었을 때 처리할 로직으로 변경 예정
    console.log(data);
  };

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  // Error Message
  const emailError = (errors: FieldErrors<FieldValues>) => {
    if (errors.email && errors.email.type === 'pattern') {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 mt-2">
          {errors.email.message?.toString()}
        </div>
      );
    }
  };

  const nicknameError = (errors: FieldErrors<FieldValues>) => {
    if (
      errors.nickname &&
      (errors.nickname.type === 'pattern' ||
        errors.nickname.type === 'minLength')
    ) {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 mt-2">
          {errors.nickname.message?.toString()}
        </div>
      );
    }
  };

  const passwordError = (errors: FieldErrors<FieldValues>) => {
    if (
      errors.password &&
      (errors.password.type === 'pattern' ||
        errors.password.type === 'minLength')
    ) {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 mt-2">
          {errors.password.message?.toString()}
        </div>
      );
    }
  };

  const passwordCheckError = (errors: FieldErrors<FieldValues>) => {
    if (errors.password_check && errors.password_check.type === 'validate') {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 mt-2">
          {errors.password_check.message?.toString()}
        </div>
      );
    }
  };

  // Input Register
  const emailRegister = {
    ...register('email', {
      required: true,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: SIGNIN_VAILDATION.email,
      },
    }),
  };

  const nicknameRsegister = {
    ...register('nickname', {
      required: true,
      pattern: {
        value: /^[가-힣a-zA-Z]+$/,
        message: SIGNIN_VAILDATION.nickname,
      },
      minLength: {
        value: 2,
        message: SIGNIN_VAILDATION.nickname,
      },
    }),
  };

  const passwordRegister = {
    ...register('password', {
      required: true,
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        message: SIGNIN_VAILDATION.pw,
      },
      minLength: {
        value: 6,
        message: SIGNIN_VAILDATION.pw,
      },
    }),
  };

  return (
    <form
      className="flex flex-col gap-5 w-[300px]"
      onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="">
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.email} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.email}
          type="email"
          {...emailRegister}
        />
        {emailError(errors)}
      </div>
      <div>
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.nickname} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.nickname}
          type="text"
          {...nicknameRsegister}
        />
        {nicknameError(errors)}
      </div>
      <div>
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.pw} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.pw}
          type="password"
          {...passwordRegister}
        />
        {passwordError(errors)}
      </div>
      <div className="mb-[25px]">
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.pw} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.pwCheck}
          type="password"
          {...register('password_check', {
            required: true,
            validate: (value) =>
              value !== passwordRef.current && SIGNIN_VAILDATION.pwCheck,
          })}
        />
        {passwordCheckError(errors)}
      </div>
      <div className="flex gap-2 justify-center">
        <CommonButton
          usage="submit"
          size="sm"
          children="회원 가입"
          className="w-[121px] h-[44px] text-[20px]"
          //  disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  nickname: `bg-[url('/assets/icon/nickname.svg')]`,
  pw: `bg-[url('/assets/icon/pw.svg')]`,
  pwCheck: `bg-[url('/assets/icon/pw_check.svg')]`,
};
