import useSignStore from '@/stores/signStore';

import SignupForm from './SignupForm';
import SignLink from '../sign/SignLink';
import SignButton from './SignButton';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';

export default function SignupIntro() {
  const { isEmailSignup, getSigninForm } = useSignStore();

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-full min-w-[312px] max-w-[480px] h-fit rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <div className="flex flex-col items-center gap-6 pt-10">
        <Logo size="medium" className="hover:scale-105 transition-transform" />

        {isEmailSignup ? <SignupForm /> : <SignButton />}
      </div>

      <div className="mt-3">
        <SignLink
          type="signin"
          route="/signin"
          text="signinText"
          onLinkTo={() => getSigninForm(false)}
          className="mt-6 pb-10"
        />
      </div>
    </div>
  );
}
