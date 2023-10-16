'use client';

import { useRouter } from 'next/navigation';

import useSignStore from '@/stores/signStore';

import useClient from '@/hooks/useClient';
import useGoogleLogin from '@/hooks/useGoogleLogin';

import { CommonButton } from '../common';

export default function LoginButtion() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;

  const router = useRouter();

  const { getSigninForm } = useSignStore();

  const isClient = useClient();
  const { isGoogleLogin, isEmailLogin, onGoogleLogin } = useGoogleLogin();

  const goToGoogleLogin = () => {
    router.push(`${googleOauth}`);
    onGoogleLogin;
  };

  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-4 mt-4">
          <CommonButton
            type="submit"
            size="fix"
            onGoogle={() => goToGoogleLogin()}
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
