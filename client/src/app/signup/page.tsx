'use client';

import Link from 'next/link';
import { useState } from 'react';

import SignupForm from '@/components/sign/signup/SignupForm';
import Screws from '@/components/common/Screws';
import Logo from '@/components/common/Logo';
import CommonButton from '@/components/common/CommonButton';

export default function Signup() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/img/bg_default.png')] bg-contain">
      {isSignup ? (
        <SignupForm />
      ) : (
        <div className="flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[548px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
          <div className="absolute flex flex-col items-center w-[35%] h-[51%]">
            <Screws />
            <div className="relative top-9">
              <Logo size="medium" />
            </div>
            <img
              src="/assets/img/bg_board_md.png"
              className="relative top-[75px] max-w-[320px] h-[224px]"
              alt="signup banner"
            />
            <p className="relative -top-[110px] flex flex-col items-center text-[20px] leading-6 text-brown-10">
              <span className="text-green-10 mb-[2px]">나만의 정원을</span>
              꾸며보세요!
            </p>
            <p className="relative -top-[85px] flex flex-col items-center text-[24px] leading-6 text-brown-10 font-bold">
              <span className="mb-2">지금 가입하면</span>
              <span className="text-[28px] text-green-10">
                500포인트 <span className="text-brown-10">증정!</span>
              </span>
            </p>
            <div className="relative bottom-[2px] flex flex-col items-center">
              <CommonButton
                usage="button"
                size="lg"
                children="이메일로 회원 가입"
                className="text-[24px] font-bold"
                handleSignup={() => setIsSignup(!isSignup)}
              />
              <Link
                href="/signin"
                className="text-sm leading-[14px] text-brown-90 mt-[16px]">
                이미 회원이라면? <span className="font-bold">로그인!</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
