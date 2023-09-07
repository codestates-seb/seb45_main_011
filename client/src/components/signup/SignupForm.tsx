'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { SignFormValue } from '@/types/common';
import useSignModalStore from '@/stores/signModalStore';
import useSignStore from '@/stores/signStore';

import SignInput from '../common/sign/SignInput';
import CommonButton from '../common/CommonButton';
import SignPasswordInput from '../common/sign/SignPasswordInput';

import { postCodeByEmail, postCreateUser } from '@/api/user';

export default function SignupForm() {
  const { changeState, currentState } = useSignModalStore();
  const { setCode, code, getSigninForm, getSignupForm } = useSignStore();
  const successedCode = currentState === 'Successed';

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignFormValue>();

  const handleValiateEmail = () => {
    changeState('AuthEmailModal');
  };

  const email = watch('email');
  const password = watch('password');
  const nickname = watch('nickname');

  const onSignup: SubmitHandler<SignFormValue> = async ({
    email,
    password,
    nickname,
  }: SignFormValue) => {
    try {
      const response = await postCreateUser(email, password, nickname);

      reset();

      getSigninForm(false);
      getSignupForm(false);

      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  const postCode = async (email: string) => {
    if (!email) return;

    try {
      const response = await postCodeByEmail(email);
      setCode(response.data.data.authCode);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSignup)}>
        <div className="flex flex-col gap-2 w-[300px]">
          <SignInput type="email" register={register} errors={errors} />
          <div className="flex justify-center">
            <CommonButton
              type="button"
              size="sm"
              children={successedCode ? '인증 완료!' : '이메일 인증하기'}
              onOpen={() => {
                handleValiateEmail();
                postCode(email);
              }}
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
              type="submit"
              size="md"
              className="w-[121px] h-[44px] mt-4"
              children="회원 가입"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
