'use client';

import { useForm } from 'react-hook-form';

import useModalStore from '@/stores/modalStore';

import useSigninMutation from '@/hooks/mutation/useSigninMutation';

import { SignPasswordInput, SignInput } from '../sign';
import { CommonButton } from '../common';

import { SignFormValue } from '@/types/common';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignFormValue>();

  const { open, changeType } = useModalStore();

  const { mutate: onSiginIn } = useSigninMutation();

  const email = watch('email');
  const password = watch('password');

  return (
    <section className="flex flex-col items-center gap-5 px-5 mt-3">
      <form onSubmit={handleSubmit(() => onSiginIn({ email, password }))}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <SignInput type="email" register={register} errors={errors} />

            <SignPasswordInput
              tag="password"
              register={register}
              errors={errors}
              watch={watch}
            />
          </div>

          <div className="flex justify-center items-center gap-3">
            <CommonButton
              type="submit"
              size="md"
              className="w-[92px] h-[44px]"
              disabled={isSubmitting}>
              로그인
            </CommonButton>

            <CommonButton
              type="button"
              size="md"
              className="w-[161px] h-[44px]"
              onFind={() => {
                changeType('FindPasswordModal');
                open();
              }}>
              비밀번호 찾기
            </CommonButton>
          </div>
        </div>
      </form>
    </section>
  );
}
