'use client';

import { useForm } from 'react-hook-form';

import useModalStore from '@/stores/modalStore';

import useAuthEmail from '@/hooks/useAuthEmail';
import useSignup from '@/hooks/useSignup';
import useEffectOnce from '@/hooks/useEffectOnce';

import { SignInput, SignPasswordInput } from '../sign';
import { CommonButton } from '../common';

import { SignFormValue } from '@/types/common';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignFormValue>();

  const { changeType, isOpen } = useModalStore();

  const { sendCodeWithEmail, isCode } = useAuthEmail();
  const { handleSignup } = useSignup();

  useEffectOnce(() => {
    changeType(null);
  });

  const email = watch('email');

  const onValidateEmail = () => {
    changeType('AuthEmailModal');
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleSignup)}>
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
