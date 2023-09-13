'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

export default function LoginButtion() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;
  const router = useRouter();
  const isClient = useClient();

  const getSigninForm = useSignStore((state) => state.getSigninForm);
  const { isGoogleLogin, setIsGoogleLogin } = useUserStore();

  const onGoogleLogin = () => {
    router.push(`${googleOauth}`);
    setIsGoogleLogin(true);
  };

  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-5 mt-8">
          {/* 소셜 로그인 버튼 */}
          <CommonButton type="submit" size="fix" onGoogle={onGoogleLogin}>
            구글로 로그인
          </CommonButton>

          {/* 자체 로그인 버튼 */}
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
