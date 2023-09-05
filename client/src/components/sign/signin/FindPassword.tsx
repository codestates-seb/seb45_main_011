'use client';

import { useState } from 'react';

import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';
import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import { SigninFormValue } from '@/types/common';

export default function FindPassword() {
  const [isEmailMatched, setIsEmailMatched] = useState('successModal');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValue>();

  // Submit Button
  const handleOnSubmit: SubmitHandler<SigninFormValue> = async (data) => {
    // 이메일을 전송하면 버튼 disable 처리 해주기
    try {
      const response = await fetch(`url`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const resData = {
        isMatched: false,
      };

      if (resData.isMatched === true) {
        // 이메일 인증 성공 모달 띄우기;
        setIsEmailMatched('sccessModal');
      }

      //! https 연결 여부 논의 필요
      //! 추후에 개인정보 처리방침 알림 제공하기
      setIsEmailMatched('failureModal');
    } catch (error) {
      console.log(error);
    }
  };

  // Error Message
  const emailError = (errors: FieldErrors<FieldValues>) => {
    if (errors.email && errors.email.type === 'pattern') {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errors.email.message?.toString()}
        </div>
      );
    }
  };

  // Input Register
  const emailRegister = {
    ...register('email', {
      required: true,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: SIGNIN_VAILDATION.email,
      },
    }),
  };

  // Email Failure OR Scceess Modal
  const emailFailureModal = () => {
    if (isEmailMatched === 'failureModal') {
      return (
        <Modal className="min-w-[531px] h-[240px] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <p className="font-bold text-brown-70 text-[28px]">
                <span className="text-red-50">등록되지 않은</span> 이메일입니다.
              </p>
              <p className="font-bold text-brown-90  text-[28px]">
                다시 입력해주세요.
              </p>
            </div>
            <div>
              <CommonButton
                usage="button"
                size="md"
                children="뒤로 가기"
                className="w-[155px] h-[52px] text-[24px]"
                handleBack={() => setIsEmailMatched('emailModal')}
              />
            </div>
          </div>
        </Modal>
      );
    }
  };

  const emailSuccessModal = () => {
    if (isEmailMatched === 'successModal') {
      return (
        <Modal className="min-w-[531px] h-[240px] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <p className="font-bold text-brown-70 text-[24px]">
                임시 비밀번호가 발송되었습니다.
              </p>
              <p className="font-bold text-brown-70  text-[28px]">
                로그인 후&nbsp;
                <span className="text-brown-90">비밀번호를 변경해주세요.</span>
              </p>
            </div>
            <div>
              <CommonButton
                usage="button"
                size="md"
                children="닫기"
                className="w-[155px] h-[52px] text-[24px]"
                //TODO: 닫기 버튼 클릭 시 모달이 보이지 않게 하기
                handleClose={() => setIsEmailMatched('emailModal')}
              />
            </div>
          </div>
        </Modal>
      );
    }
  };

  return (
    <>
      {isEmailMatched === 'emailModal' && (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          {/* 추후 반응형 구현을 위해 일단은 min-w로 입력함 */}
          <Modal className="min-w-[531px] h-[291px] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-brown-70 text-[24px]">
                  가입하셨던 이메일을 입력해주시면
                </p>
                <p className="font-bold text-brown-70  text-[28px]">
                  <span className="text-brown-90">임시 비밀번호</span>를 발송해
                  드립니다.
                </p>
              </div>
              <div>
                <input
                  className={`min-w-[300px] pl-4 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-[50px] bg-[center_left_12px] bg-no-repeat leading-[12px] outline-none shadow-outer/down`}
                  placeholder={SIGNIN_REQUIRE.email}
                  type="email"
                  {...emailRegister}
                />
                {emailError(errors)}
              </div>
              <div className="flex gap-2">
                <CommonButton
                  usage="submit"
                  size="md"
                  children="완료"
                  className="w-[96px] h-[52px] text-[24px]"
                />
                <CommonButton
                  usage="button"
                  size="md"
                  children="취소"
                  className="w-[96px] h-[52px] text-[24px]"
                  handleFindCancel={() => setIsEmailMatched('')}
                />
              </div>
            </div>
          </Modal>
        </form>
      )}
      {emailSuccessModal()}
      {emailFailureModal()}
    </>
  );
}
