import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postUserInfo } from '@/api/user';

import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import { SigninFormValue } from '@/types/common';

import { ALERT_TEXT } from '@/constants/contents';

import setCookiesByUserId from '@/utils/setCookiesByUserId';

const useSigninMutation = () => {
  const router = useRouter();

  const { reset } = useForm<SigninFormValue>();

  const { setEmailUser } = useUserStore();
  const { setSelected } = useChatStore();
  const { getSigninForm, getSignupForm } = useSignStore();

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: SigninFormValue) =>
      postUserInfo(email, password),

    onSuccess: (data) => {
      const userId = String(data.data.accountId);

      const accessToken = data.headers.authorization;
      const refreshToken = data.headers.refresh;

      const displayName = decodeURIComponent(data.data.displayName).replaceAll(
        '+',
        ' ',
      );

      const profileImageUrl = data.data.profileImageUrl;

      setEmailUser({
        userId,
        accessToken,
        refreshToken,
        displayName,
        profileImageUrl,
      });

      setCookiesByUserId(userId);

      getSigninForm(false);
      getSignupForm(false);

      reset();

      setSelected('home');

      router.push('/');
    },

    onError: () => {
      alert(ALERT_TEXT.login);
    },
  });

  return { mutate };
};

export default useSigninMutation;
