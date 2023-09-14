'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import SignLink from '../sign/SignLink';
import SigninForm from './SigninForm';
import LoginButtion from './LoginButton';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';

export default function SigninIntro() {
  const router = useRouter();
  const { isEmailSignin, getSignupForm } = useSignStore();
  const { isGoogleLogin, setUser } = useUserStore();

  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);

    const userId = urlParams.get('accountId');
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    const displayName = urlParams.get('displayName');
    const profileImageUrl = urlParams.get('profileImageUrl');

    if (
      userId &&
      accessToken &&
      refreshToken &&
      displayName &&
      profileImageUrl
    ) {
      setUser({
        userId,
        accessToken,
        refreshToken,
        displayName,
        profileImageUrl,
      });
      // router.push('/');
    }
  }, [isGoogleLogin]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[420px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <div className="flex flex-col items-center gap-5">
        <Logo size="medium" />
        {isEmailSignin ? <SigninForm /> : <LoginButtion />}
        <SignLink
          type="signup"
          route="/signup"
          text="signupText"
          onLinkTo={() => getSignupForm(false)}
          className="mt-2"
        />
      </div>
      <Screws />
    </div>
  );
}
