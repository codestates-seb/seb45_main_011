'use client';

import { useRouter } from 'next/navigation';

import { CommonButton, Modal } from '../common';

import useGoogleLogin from '@/hooks/useGoogleLogin';

export default function MembershipCheckModal() {
  const googleOauth = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;

  const router = useRouter();

  const { onGoogleLogin } = useGoogleLogin();

  const goToGoogleLogin = () => {
    router.push(`${googleOauth}`);
    onGoogleLogin;
  };

  return (
    <Modal className="min-w-[312px] max-w-[400px] flex flex-col justify-center items-center">
      <div className="px-11 py-9 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="max-[884px]:text-[20px] max-[740px]:text-[16px] text-[24px] text-brown-70 font-bold mb-3">
            회원님은 비밀번호 없이
          </p>

          <p className="max-[884px]:text-[24px] max-[740px]:text-[20px] text-[30px] text-brown-90 font-bold mb-6">
            로그인이 가능합니다!
          </p>
        </div>

        <div>
          <CommonButton
            type="button"
            size="md"
            className="px-5 py-[10px]"
            onGoogle={() => goToGoogleLogin()}>
            구글로 로그인
          </CommonButton>
        </div>
      </div>
    </Modal>
  );
}
