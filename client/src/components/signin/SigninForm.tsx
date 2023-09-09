'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { postUserInfo } from '@/api/user';

import useSignModalStore from '@/stores/signModalStore';
import useSignStore from '@/stores/signStore';
import usePesistStore from '@/stores/persistStore';

import CommonButton from '../common/CommonButton';
import SignPasswordInput from '../common/sign/SignPasswordInput';
import SignInput from '../common/sign/SignInput';

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

  const { changeState } = useSignModalStore();
  const { getSigninForm, getSignupForm } = useSignStore();
  const {
    setIsLogin,
    setAccessToken,
    setRefershToken,
    setDisplayName,
    setProfileImageUrl,
  } = usePesistStore();

  const email = watch('email');
  const password = watch('password');

  const onLogin: SubmitHandler<SignFormValue> = async ({
    email,
    password,
  }: SignFormValue) => {
    try {
      const response = await postUserInfo(email, password);

      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.refresh;
      const username = response.data.displayName;
      const userProfileImage = response.data.profileImageUrl;

      setAccessToken(accessToken);
      setRefershToken(refreshToken);
      setDisplayName(username);
      setProfileImageUrl(userProfileImage);

      setIsLogin(true);
      getSigninForm(false);
      getSignupForm(false);

      reset();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 ">
      <form onSubmit={handleSubmit(onLogin)}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
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
              className="w-[121px] h-[44px]"
              children="로그인"
            />
            <CommonButton
              type="button"
              size="md"
              className="w-[161px] h-[44px]"
              children="비밀번호 찾기"
              onFind={() => changeState('FindPasswordModal')}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
