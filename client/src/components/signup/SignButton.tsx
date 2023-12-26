'use client';

import useSignStore from '@/stores/signStore';

import { CommonButton } from '../common';

export default function SignButton() {
  const { isEmailSignup, getSignupForm } = useSignStore();

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-[url('/assets/img/bg_board_md.png')] w-[320px] h-[224px] shadow-outer/down max-[432px]:scale-75 max-[432px]:-my-4-6">
        <div className="flex flex-col items-center text-[20px] text-white-10 mb-4">
          <p className="mb-1">
            <span className=" text-green-10">나만의 정원</span>을
          </p>
          꾸며 보세요!
        </div>

        <div className="flex flex-col items-center text-[24px] text-white-10 font-bold">
          <p className="mb-2">지금 가입하면</p>

          <p>
            <span className="text-[28px] text-green-10">500포인트</span>
            증정!
          </p>
        </div>
      </section>

      <CommonButton
        type="button"
        size="fix"
        onEmailSignup={() => getSignupForm(!isEmailSignup)}
        className="mt-2">
        이메일로 회원가입
      </CommonButton>
    </>
  );
}
