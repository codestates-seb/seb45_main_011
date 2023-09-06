'use client';

import { useForm } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import SignInput from '../common/sign/SignInput';
import CommonButton from '../common/CommonButton';
import SignLink from '../common/sign/SignLink';
import Logo from '../common/Logo';
import Screws from '../common/Screws';
import useSignModalStore from '@/stores/signModalStore';
import SignPasswordInput from '../common/sign/SignPasswordInput';

export default function SignForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignFormValue>();

  const { changeState, currentState } = useSignModalStore();

  const handleValiateEmail = () => {
    changeState('AuthEmailModal');
  };

  const successedCode = currentState === 'Successed';

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[480px] h-[560px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
      <Screws />
      <div className="flex flex-col items-center gap-5 ">
        <Logo size="medium" />
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="flex flex-col gap-2 w-[300px]">
            <SignInput type="email" register={register} errors={errors} />
            <div className="flex justify-center">
              <CommonButton
                usage="button"
                size="sm"
                children={successedCode ? '인증 완료!' : '이메일 인증하기'}
                handleOpen={handleValiateEmail}
                disabled={successedCode}
              />
            </div>
            <SignInput
              type="nickname"
              register={register}
              errors={errors}
              disabled={!successedCode}
            />
            <SignPasswordInput
              tag="password"
              register={register}
              errors={errors}
              watch={watch}
              disabled={!successedCode}
            />
            <SignPasswordInput
              tag="passwordCheck"
              register={register}
              errors={errors}
              watch={watch}
              disabled={!successedCode}
            />
            <div className="flex flex-col justify-center items-center gap-3">
              <CommonButton
                usage="submit"
                size="md"
                className="w-[121px] h-[44px] mt-4"
                children="회원 가입"
              />
              <SignLink type="signin" route="/signin" text="signinText" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
