'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import SignLink from '../sign/SignLink';
import SigninForm from './SigninForm';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';
import CommonButton from '@/components/common/CommonButton';

export default function SigninIntro() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;
  const router = useRouter();
  const { isEmailSignin, getSigninForm, getSignupForm } = useSignStore();
  const {
    isGoogleLogin,
    setIsGoogleLogin,
    setAccessToken,
    setRefershToken,
    setDisplayName,
    setProfileImageUrl,
    saveUserId,
  } = useUserStore();

  const onGoogleLogin = async () => {
    console.log('go');

    try {
      await router.push(`${googleOauth}`);
      setIsGoogleLogin(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);

    const googleAccoutId = urlParams.get('accountId');
    const googleAccessToken = urlParams.get('access_token');
    const googleRefreshToken = urlParams.get('refresh_token');
    const googleDisplayName = urlParams.get('displayName');
    const googleProfileImageUrl = urlParams.get('profileImageUrl');

    if (
      googleAccoutId &&
      googleAccessToken &&
      googleRefreshToken &&
      googleDisplayName &&
      googleProfileImageUrl
    ) {
      saveUserId(Number(googleAccoutId));
      setAccessToken(googleAccessToken as string);
      setRefershToken(googleRefreshToken as string);
      setDisplayName(googleDisplayName as string);
      setProfileImageUrl(googleProfileImageUrl as string);
      router.push('/');
    }
  }, [isGoogleLogin]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[420px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <div className="flex flex-col items-center gap-5">
        <Logo size="medium" />
        {isEmailSignin ? (
          <SigninForm />
        ) : (
          <div className="flex flex-col gap-4 my-4">
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
              disabled={isGoogleLogin}
            />
          </div>
        )}
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
