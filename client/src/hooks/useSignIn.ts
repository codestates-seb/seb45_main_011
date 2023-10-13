import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { postUserInfo } from '@/api/user';

import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import { SignFormValue } from '@/types/common';

import { ALERT_TEXT } from '@/constants/contents';

const useSignin = () => {
  const router = useRouter();

  const { reset } = useForm<SignFormValue>();

  const { setEmailUser } = useUserStore();
  const { getSigninForm, getSignupForm } = useSignStore();

  const handleLogin: SubmitHandler<SignFormValue> = async ({
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

  return { handleLogin };
};

export default useSignin;
