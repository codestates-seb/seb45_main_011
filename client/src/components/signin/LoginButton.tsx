'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';

import useClient from '@/hooks/useClient';

import { CommonButton } from '../common';

export default function LoginButtion() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;

  const router = useRouter();

  const { isGoogleLogin, setGoogleUser, isEmailLogin } = useUserStore();
  const { getSigninForm } = useSignStore();

  const isClient = useClient();

  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);

    const userId = String(urlParams.get('accountId'));

    const accessToken = `Bearer ${urlParams.get('access_token')}`;
    const refreshToken = urlParams.get('refresh_token');

    const username = urlParams.get('displayName');
    const displayName = decodeURIComponent(username as string);

    const profileImageUrl = urlParams.get('profileIamgeUrl');

    if (
      userId &&
      accessToken &&
      refreshToken &&
      displayName &&
      profileImageUrl
    ) {
      setGoogleUser({
        userId,
        accessToken,
        refreshToken,
        displayName,
        profileImageUrl,
      });

      router.push('/');
    }
  }, [isGoogleLogin]);

  const onGoogleLogin = () => {
    router.push(`${googleOauth}`);
  };

  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-4 mt-4">
          <CommonButton
            type="submit"
            size="fix"
            onGoogle={() => onGoogleLogin()}
            disabled={isEmailLogin}
            className="hover:scale-105 transition-transform">
            구글로 로그인
          </CommonButton>

          <CommonButton
            type="button"
            size="fix"
            onEmailSignin={() => getSigninForm(true)}
            disabled={isGoogleLogin}>
            이메일로 로그인
          </CommonButton>
        </div>
      )}
    </>
  );
}
