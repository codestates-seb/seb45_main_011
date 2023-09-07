'use client';

import SigninForm from './SigninForm';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';
import CommonButton from '@/components/common/CommonButton';
import SignLink from '../common/sign/SignLink';

import useSignStore from '@/stores/signStore';

import { getUserInfoByGoogle } from '@/api/user';

export default function SigninIntro() {
  const { isEmailSignin, getSigninForm, getSignupForm } = useSignStore();

  const onGoogleLogin = () => {
    try {
      const response = getUserInfoByGoogle();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[420px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <div className="absolute top-8 flex flex-col items-center gap-5">
        <Logo size="medium" />

        {isEmailSignin ? (
          <SigninForm />
        ) : (
          <div className="flex flex-col gap-5 mt-8">
            {/* 소셜 로그인 버튼 */}
            <CommonButton
              type="submit"
              size="fix"
              children="구글로 로그인"
              onGoogle={onGoogleLogin}
            />
            {/* 자체 로그인 버튼 */}
            <CommonButton
              type="button"
              size="fix"
              children="이메일로 로그인"
              onEmailSignin={() => getSigninForm(true)}
            />
          </div>
        )}
        <SignLink
          type="signup"
          route="/signup"
          text="signupText"
          onLinkTo={() => getSignupForm(false)}
        />
      </div>
    </div>
  );
}
