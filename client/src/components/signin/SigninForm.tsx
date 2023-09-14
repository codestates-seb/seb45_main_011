'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { postUserInfo } from '@/api/user';

import useSignModalStore from '@/stores/signModalStore';
import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import SignPasswordInput from '../sign/SignPasswordInput';
import SignInput from '../sign/SignInput';

import CommonButton from '../common/CommonButton';

import { SignFormValue } from '@/types/common';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignFormValue>();

  const router = useRouter();

  const changeState = useSignModalStore((state) => state.changeState);
  const { getSigninForm, getSignupForm } = useSignStore();
  const { setIsLogin, setUser } = useUserStore();

  const onLogin: SubmitHandler<SignFormValue> = async ({
    email,
    password,
  }: SignFormValue) => {
    try {
      const response = await postUserInfo(email, password);

      const userId = String(response.data.accountId);
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.refresh;
      const displayName = decodeURIComponent(response.data.displayName);
      const profileImageUrl = response.data.profileImageUrl;

      setIsLogin(true);
      setUser({
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
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 px-5 mt-3">
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
              className="w-[92px] h-[44px] hover:scale-105 transition-transform">
              로그인
            </CommonButton>
            <CommonButton
              type="button"
              size="md"
              className="w-[161px] h-[44px] hover:scale-105 transition-transform"
              onFind={() => changeState('FindPasswordModal')}>
              비밀번호 찾기
            </CommonButton>
          </div>
        </div>
      </form>
    </div>
  );
}
