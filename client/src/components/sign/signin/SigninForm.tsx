'use client';

import Link from 'next/link';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';
import CommonButton from '@/components/common/CommonButton';
import SigninTextBox from './SigninTextBox';

export default function SigninForm() {
  const [isClicked, setIsClicked] = useState('forButton');
  const { data } = useSession();
  const router = useRouter();

  // console.log(data);

  // useEffect(() => {
  //   if (session) {
  //     router.push('/');
  //   }

  //   router.push('/signin');
  // }, [session]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] max-w-[480px] h-[420px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <div className="absolute top-8 flex flex-col items-center gap-5">
        <Logo size="medium" />
        {isClicked === 'textBox' ? (
          <SigninTextBox />
        ) : (
          <div className="flex flex-col gap-5 mt-8">
            <CommonButton
              usage="submit"
              size="fix"
              children="구글로 로그인"
              // handleGoogleAuth={() => signIn()}
            />
            <CommonButton
              usage="button"
              size="fix"
              children="이메일로 로그인"
              handleEmailLogin={() => setIsClicked('textBox')}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                signIn('google', { callbackUrl: '/' });
              }}>
              구글
            </button>
          </div>
        )}
        <Link
          href="/signup"
          className={`text-sm leading-[14px] text-brown-90 ${LINK_MARGIN_STYLE[isClicked]}`}>
          아직 회원이 아니라면? <span className="font-bold">가입하기!</span>
        </Link>
      </div>
    </div>
  );
}

const LINK_MARGIN_STYLE: Record<string, string> = {
  // Record<string, string>는 key:value가 string 타입임을 나타낸다
  textBox: 'mt-1',
  forButton: 'mt-9',
} as const;
