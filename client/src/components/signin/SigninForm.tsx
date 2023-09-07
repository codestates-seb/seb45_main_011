'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

import { postUserInfo } from '@/api/user';

import CommonButton from '../common/CommonButton';
import SignPasswordInput from '../common/sign/SignPasswordInput';
import SignInput from '../common/sign/SignInput';

import { SignFormValue, cookieOption } from '@/types/common';
import useSignModalStore from '@/stores/signModalStore';
import useSignStore from '@/stores/signStore';

export default function SigninForm() {
  const { setIsLogin, getSigninForm, getSignupForm } = useSignStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignFormValue>();
  const { changeState } = useSignModalStore();

  const email = watch('email');
  const password = watch('password');

  const onLogin: SubmitHandler<SignFormValue> = async ({
    email,
    password,
  }: SignFormValue) => {
    try {
      const response = await postUserInfo(email, password);

      const cookieOption: cookieOption = {
        //! 서버와 연동 시 domain, path는 변경해야함
        domain: 'localhost',
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        //! httpOnly: true,
      };

      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.refresh;

      setCookie('accessToken', accessToken, cookieOption);
      setCookie('refreshToken', refreshToken, cookieOption);

      reset();

      setIsLogin(true);
      getSigninForm(false);
      getSignupForm(false);

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
