'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

export default function LoginButtion() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;

  const isClient = useClient();
  const router = useRouter();

  const getSigninForm = useSignStore((state) => state.getSigninForm);
  const { isGoogleLogin, setIsGoogleLogin } = useUserStore();

  const onGoogleLogin = () => {
    setIsGoogleLogin(true);

    router.push(`${googleOauth}`);
  };

  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-4 mt-4">
          <CommonButton
            type="submit"
            size="fix"
            onGoogle={onGoogleLogin}
            className="hover:scale-105 transition-transform">
            구글로 로그인
          </CommonButton>

          <CommonButton
            type="button"
            size="fix"
            onEmailSignin={() => getSigninForm(true)}
            disabled={isGoogleLogin}
            className="hover:scale-105 transition-transform">
            이메일로 로그인
          </CommonButton>
        </div>
      )}
    </>
  );
}
