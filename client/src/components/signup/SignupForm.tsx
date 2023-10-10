'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { postCreateUser, sendCodeByEmail } from '@/api/user';

import useModalStore from '@/stores/modalStore';
import useSignStore from '@/stores/signStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import { SignInput, SignPasswordInput } from '../sign';
import { CommonButton } from '../common';

import { SignFormValue } from '@/types/common';

export default function SignupForm() {
  const router = useRouter();

  const [isCode, setIsCode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<SignFormValue>();

  const { changeType, open, isOpen } = useModalStore();
  const { setCode, getSigninForm, getSignupForm } = useSignStore();

  const email = watch('email');

  useEffectOnce(() => {
    changeType(null);
  });

  const onValidateEmail = () => {
    changeType('AuthEmailModal');
  };

  const sendCodeWithEmail = async (email: string) => {
    if (!email || isCode) return;

    try {
      const response = await sendCodeByEmail(email);

      open();

      setCode(response.data.data.authCode);
      setIsCode(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSignup: SubmitHandler<SignFormValue> = async ({
    email,
    password,
    nickname,
  }: SignFormValue) => {
    try {
      await postCreateUser(email, password, nickname);

      reset();

      getSigninForm(false);
      getSignupForm(false);

      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSignup)}>
        <div className="flex flex-col gap-1 w-[300px]">
          <SignInput type="email" register={register} errors={errors} />
          <div className="flex justify-center">
            <CommonButton
              type="button"
              size="sm"
              onOpen={() => {
                onValidateEmail();
                sendCodeWithEmail(email);
              }}
              className="mb-3"
              disabled={isOpen}>
              {isCode ? '인증 완료!' : '이메일 인증하기'}
            </CommonButton>
          </div>

          <SignInput
            type="nickname"
            register={register}
            errors={errors}
            disabled={!isCode}
          />

          <SignPasswordInput
            tag="password"
            register={register}
            errors={errors}
            watch={watch}
            disabled={!isCode}
          />

          <SignPasswordInput
            tag="passwordCheck"
            register={register}
            errors={errors}
            watch={watch}
            disabled={!isCode}
          />

          <div className="flex flex-col justify-center items-center gap-3">
            <CommonButton
              type="submit"
              size="md"
              className="w-[121px] h-[44px]"
              disabled={isSubmitting}>
              회원 가입
            </CommonButton>
          </div>
        </div>
      </form>
    </section>
  );
}
