'use client';

import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { SigninFormValue, cookieOption } from '@/types/common';

import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import CommonButton from '@/components/common/CommonButton';

export default function SigninTextBox() {
  //TODO: 이메일, 비밀번호를 전송하면 버튼 disable 처리 해주기
  //! 아직 CommonButton에 disable 속성이 없는 것 같다...!
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValue>();

  const cookieOption: cookieOption = {
    //! 서버와 연동 시 domain, path는 변경해야함
    domain: 'localhost',
    path: '/',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // Submit Button
  const handleOnSubmit: SubmitHandler<SigninFormValue> = async (data) => {
    try {
      const response = await fetch(`url`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        // 엑세스 토큰과 리프레쉬 토큰을 넣어 cookie 생성
        setCookie('accessToken', accessToken, cookieOption);
        setCookie('refreshToken', refreshToken, cookieOption);

        router.push('/');
      }

      alert('로그인에 실패했습니다. 다시 로그인해 주세요.');

      //! https 연결 여부 논의 필요
      //! 추후에 개인정보 처리방침 알림 제공하기
    } catch (error) {
      console.log(error);
    }
  };

  // Error Message
  const emailError = (errors: FieldErrors<FieldValues>) => {
    if (errors.email && errors.email.type === 'pattern') {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errors.email.message?.toString()}
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
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errors.password.message?.toString()}
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
      className="flex flex-col w-[300px] gap-5"
      onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
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
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.pw} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.pw}
          {...passwordRegister}
          type="password"
        />
        {passwordError(errors)}
      </div>
      <div className="flex gap-2 justify-center mt-2">
        <CommonButton
          usage="submit"
          size="sm"
          children="로그인"
          className="w-[92px] h-[44px] text-[20px]"
          //  disabled={isSubmitting}
        />
        <CommonButton
          usage="submit"
          size="sm"
          children="비밀번호 찾기"
          className="w-[161px] h-[44px] text-[20px]"
        />
      </div>
    </form>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  pw: `bg-[url('/assets/icon/pw.svg')]`,
};
