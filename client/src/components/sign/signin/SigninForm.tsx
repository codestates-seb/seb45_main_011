import Link from 'next/link';

import Logo from '@/components/common/Logo';
import SigninTextBox from './SigninTextBox';

export default function SigninForm() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] max-w-[480px] h-[420px] rounded-[12px] border-8 border-border-30 shadow-inner">
      <img
        src="/assets/img/screw.svg"
        width={14}
        height={14}
        className="absolute top-2 left-2"
      />
      <img
        src="/assets/img/screw.svg"
        width={14}
        height={14}
        className="absolute top-2 right-2"
      />
      <div className="flex flex-col items-center gap-7">
        <Logo size="medium" />
        <SigninTextBox />
      </div>
      <Link
        href="/signup"
        className="text-sm leading-[14px] text-brown-90 mt-[14px]">
        아직 회원이 아니라면? <span className="font-bold">가입하기!</span>
      </Link>
      <img
        src="/assets/img/screw.svg"
        width={14}
        height={14}
        className="absolute bottom-2 left-2"
      />
      <img
        src="/assets/img/screw.svg"
        width={14}
        height={14}
        className="absolute bottom-2 right-2"
      />
    </div>
  );
}
