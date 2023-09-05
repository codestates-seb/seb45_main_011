'use cilent';

import { useEffect, useRef, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import {
  SIGNIN_REQUIRE,
  SIGNIN_VAILDATION,
  SIGN_DEFAULT_VALUE,
} from '@/constants/contents';
import { SignupFormValue } from '@/types/common';

import CommonButton from '@/components/common/CommonButton';
import AuthenticateEmail from './AuthenticateEmail';
import { useRouter } from 'next/navigation';

export default function SignupTextBox() {
  const [isAuthEmail, setIsAuthEmail] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignupFormValue>({ defaultValues: SIGN_DEFAULT_VALUE });

  // Submit Button
  const handleOnSubmit: SubmitHandler<SignupFormValue> = async (data) => {
    try {
      const response = await fetch(`url`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          nickname: data.nickname,
          password: data.password,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.status === 200) {
        router.push('/signin');
      }

      alert('회원 가입에 실패했습니다. 다시 시도해주세요.');

      //! https 연결 여부 논의 필요
      //! 추후에 개인정보 처리방침 알림 제공하기
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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

  const passwordCheckRegister = {
    ...register('password_check', {
      required: true,
      validate: (value) =>
        value !== passwordRef.current && SIGNIN_VAILDATION.pwCheck,
    }),
  };

  return (
    <form
      className="flex flex-col gap-5 w-[300px]"
      onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.email} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.email}
          type="email"
          autoComplete="off"
          {...emailRegister}
        />
        {emailError(errors)}
        <div className="flex justify-center mt-3">
          <CommonButton
            usage="button"
            size="sm"
            //TODO: 이메일을 적고 이메일 인증 버튼을 누를 수 있게 구현하기
            //TODO: 인증 성공일 때 disable 처리하기
            children={isSuccess ? '인증 성공!' : '이메일 인증하기'}
            handleCode={() => setIsAuthEmail(!isAuthEmail)}
            // disabled={isSuccess}
          />
          {isAuthEmail && (
            <AuthenticateEmail
              isAuthEmail={isAuthEmail}
              setIsAuthEmail={setIsAuthEmail}
              setIsSuccess={setIsSuccess}
            />
          )}
        </div>
      </div>
      <div>
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.nickname} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.nickname}
          type="text"
          autoComplete="off"
          {...nicknameRsegister}
          // onClick={() => !isSuccess && alert('먼저 이메일 인증을 해주세요.')}
          disabled={!isSuccess ? true : false}
        />
        {nicknameError(errors)}
      </div>
      <div>
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.pw} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.pw}
          type="password"
          {...passwordRegister}
          disabled={!isSuccess ? true : false}
        />
        {passwordError(errors)}
      </div>
      <div className="">
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.pw} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.pwCheck}
          type="password"
          {...passwordCheckRegister}
          disabled={!isSuccess ? true : false}
        />
        {passwordCheckError(errors)}
      </div>
      <div className="flex justify-center">
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
