'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

export default function LoginButtion() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;

  const isClient = useClient();
  const router = useRouter();

  const getSigninForm = useSignStore((state) => state.getSigninForm);
  const { isGoogleLogin, setGoogleUser, isLogin } = useUserStore();

  const onGoogleLogin = () => {
    router.push(`${googleOauth}`);
  };

  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);

    const userId = String(urlParams.get('accountId'));
    const accessToken = `Bearer ${urlParams.get('access_token')}`;
    const refreshToken = urlParams.get('refresh_token');
    const username = urlParams.get('displayName');
    //! profileIamgeUrl
    const profileImageUrl = urlParams.get('profileIamgeUrl');

    const displayName = decodeURIComponent(username as string);

    if (
      userId &&
      accessToken &&
      refreshToken &&
      displayName &&
      profileImageUrl
    ) {
      setGoogleUser({
        accessToken,
        refreshToken,
        userId,
        displayName,
        profileImageUrl,
      });

      router.push('/');
    }
  }, [isGoogleLogin]);

  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-4 mt-4">
          <CommonButton
            type="submit"
            size="fix"
            onGoogle={onGoogleLogin}
            disabled={isLogin}
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
