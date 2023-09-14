'use client';

import useSignStore from '@/stores/signStore';

import CommonButton from '../common/CommonButton';

export default function SignButton() {
  const { isEmailSignup, getSignupForm } = useSignStore();

  return (
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
            <span className="text-[28px] text-green-10">500포인트</span>
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
  );
}
