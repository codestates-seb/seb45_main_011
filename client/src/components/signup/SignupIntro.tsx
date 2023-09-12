import useSignStore from '@/stores/signStore';

import Logo from '@/components/common/Logo';
import Screws from '@/components/common/Screws';
import SignupForm from './SignupForm';
import SignLink from '../sign/SignLink';

import CommonButton from '../common/CommonButton';

export default function SignupIntro() {
  const { isEmailSignup, getSignupForm, getSigninForm } = useSignStore();

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[560px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <div className="flex flex-col items-center gap-8">
        <Logo size="medium" />
        {isEmailSignup ? (
          <SignupForm />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center bg-[url('/assets/img/bg_board_md.png')] w-[320px] h-[224px]  shadow-outer/down">
              <div className="flex flex-col items-center text-[20px] text-white-10 mb-4">
                <div className="mb-1">
                  <span className=" text-green-10">나만의 정원</span>을
                </div>
                꾸며 보세요!
              </div>
              <div className="flex flex-col items-center text-[24px] text-white-10 font-bold">
                <div className="mb-2">지금 가입하면</div>
                <div>
                  <span className="text-[28px] text-green-10">500포인트</span>{' '}
                  증정!
                </div>
              </div>
            </div>
            <CommonButton
              type="button"
              size="fix"
              children="이메일로 회원가입"
              onEmailSignup={() => getSignupForm(!isEmailSignup)}
            />
          </>
        )}
      </div>
      <div className="mt-3">
        <SignLink
          type="signin"
          route="/signin"
          text="signinText"
          onLinkTo={() => getSigninForm(false)}
          className="mt-4"
        />
      </div>
    </div>
  );
}
