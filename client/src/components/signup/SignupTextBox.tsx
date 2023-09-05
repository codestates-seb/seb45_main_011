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
  //! enter 시 sumbit 방지, 같이 sumbit 하지 않을 폼은 분리하기
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<SignupFormValue>({ defaultValues: SIGN_DEFAULT_VALUE });

  // 이메일 인증하기 버튼 클릭 여부
  const [isAuthEmail, setIsAuthEmail] = useState(false);
  // 이메일 인증 완료 여부
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRef = useRef<string | null>(null);
  const router = useRouter();

  passwordRef.current = watch('password');
  const email = watch('email');

  // api 폴더로 분리하기
  const handleEmailVerification = async () => {
    if (!email) return;

    try {
      const response = await fetch(`url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // 이메일을 서버로 전송
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Submit Button - api 폴더로 분리하기
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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

  // 앞글자만 대문자로 변경 -> 컴포넌트이므로 -> errors를 Props로 내려주기
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
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/,
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

  // 조건에 따라서 이메일 인증하기 버튼의 이름과 상태를 변경
  const emailAuth = () => {
    let buttonText = '이메일 인증하기';
    let buttonDisabled = false;

    if (email === '') {
      buttonDisabled = true;
    }

    if (isSuccess) {
      buttonText = '인증 성공!';
      buttonDisabled = true;
    }

    return (
      <CommonButton
        usage="button"
        size="sm"
        children={buttonText}
        disabled={buttonDisabled}
        handleCode={() => {
          if (!isSuccess && email !== '') {
            // 이메일 인증하기 버튼을 누르면 인증 번호 모달창이 띄워진다
            setIsAuthEmail(!isAuthEmail);
            // 동시에 작성한 이메일로 인증 번호가 발송된다
            handleEmailVerification();
          }
        }}
      />
    );
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
          {emailAuth()}
          {/* 인증 번호 모달 */}
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
          disabled={isSubmitting}
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
