import Link from 'next/link';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';

import SignupTextBox from './SignupTextBox';

export default function SignupForm() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[548px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <div className="flex flex-col items-center gap-9">
        <Logo size="medium" />
        <SignupTextBox />
      </div>
      <Link
        href="/signin"
        className="text-sm leading-[14px] text-brown-90 mt-[14px]">
        이미 회원이라면? <span className="font-bold">로그인!</span>
      </Link>
    </div>
  );
}
