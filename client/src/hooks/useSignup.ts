import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { postCreateUser } from '@/api/user';

import useSignStore from '@/stores/signStore';

import { SignFormValue } from '@/types/common';

const useSignup = () => {
  const router = useRouter();

  const { reset } = useForm<SignFormValue>();

  const { getSigninForm, getSignupForm, setIsCode } = useSignStore();

  const handleSignup: SubmitHandler<SignFormValue> = async ({
    email,
    password,
    nickname,
  }: SignFormValue) => {
    try {
      await postCreateUser(email, password, nickname);

      reset();

      getSigninForm(false);
      getSignupForm(false);
      setIsCode(false);

      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSignup };
};

export default useSignup;
