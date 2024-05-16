import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';

import setCookiesByUserId from '@/utils/setCookiesByUserId';

const useGoogleLogin = () => {
  const router = useRouter();

  const { isGoogleLogin, setGoogleUser, isEmailLogin } = useUserStore();

  const onGoogleLogin = useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);

    const userId = String(urlParams.get('accountId'));

    const accessToken = `Bearer ${urlParams.get('access_token')}`;
    const refreshToken = urlParams.get('refresh_token');

    const username = urlParams.get('displayName');
    const displayName = decodeURIComponent(username as string);

    const profileImageUrl = urlParams.get('profileIamgeUrl');

    if (
      userId &&
      accessToken &&
      refreshToken &&
      displayName &&
      profileImageUrl
    ) {
      setCookiesByUserId(userId);

      setGoogleUser({
        userId,
        accessToken,
        refreshToken,
        displayName,
        profileImageUrl,
      });

      router.push('/');
    }
  }, [isGoogleLogin]);

  return { isGoogleLogin, setGoogleUser, isEmailLogin, onGoogleLogin };
};

export default useGoogleLogin;
