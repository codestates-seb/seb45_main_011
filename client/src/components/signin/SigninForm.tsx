'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { postUserInfo } from '@/api/user';

import useModalStore from '@/stores/modalStore';
import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import { SignPasswordInput, SignInput } from '../sign';
import { CommonButton } from '../common';

import { SignFormValue } from '@/types/common';

import { ALERT_TEXT } from '@/constants/contents';

export default function SigninForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<SignFormValue>();

  const { open, changeType } = useModalStore();
  const { getSigninForm, getSignupForm } = useSignStore();
  const { setEmailUser } = useUserStore();

  const onLogin: SubmitHandler<SignFormValue> = async ({
    email,
    password,
  }: SignFormValue) => {
    try {
      const response = await postUserInfo(email, password);

      const userId = String(response.data.accountId);

      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.refresh;

      const displayName = decodeURIComponent(
        response.data.displayName,
      ).replaceAll('+', ' ');

      const profileImageUrl = response.data.profileImageUrl;

      setEmailUser({
        userId,
        accessToken,
        refreshToken,
        displayName,
        profileImageUrl,
      });

      getSigninForm(false);
      getSignupForm(false);

      reset();

      router.push('/');
    } catch (error) {
      alert(ALERT_TEXT.login);
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col items-center gap-5 px-5 mt-3">
      <form onSubmit={handleSubmit(onLogin)}>
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
