'use client';

import useSignStore from '@/stores/signStore';

import { SigninForm, LoginButtion } from '.';
import { SignLink } from '../sign';
import { Logo, Screws } from '../common';

export default function SigninIntro() {
  const { isEmailSignin, getSignupForm } = useSignStore();

  return (
    <main className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-full min-w-[312px] max-w-[480px] h-fit rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <div className="flex flex-col items-center gap-5 py-10">
        <Logo size="medium" className="hover:scale-105 transition-transform" />

        {isEmailSignin ? <SigninForm /> : <LoginButtion />}

        <SignLink
          type="signup"
          route="/signup"
          text="signupText"
          onLinkTo={() => getSignupForm(false)}
          className="mt-5"
        />
      </div>
      <Screws />
    </main>
  );
}
