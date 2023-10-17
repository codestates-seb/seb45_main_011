import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postCreateUser } from '@/api/user';

import useSignStore from '@/stores/signStore';

import { SignupFormValue } from '@/types/common';

const useSignup = () => {
  const router = useRouter();

  const { reset } = useForm<SignupFormValue>();

  const { getSigninForm, getSignupForm, setIsCode } = useSignStore();

  const { mutate: onSignup } = useMutation({
    mutationFn: ({ email, password, nickname }: SignupFormValue) =>
      postCreateUser(email, password, nickname as string),

    onSuccess: () => {
      reset();

      getSigninForm(false);
      getSignupForm(false);
      setIsCode(false);

      router.push('/signin');
    },
  });

  return { onSignup };
};

export default useSignup;
