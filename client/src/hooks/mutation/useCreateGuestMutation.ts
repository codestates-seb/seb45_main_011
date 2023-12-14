import { useMutation } from '@tanstack/react-query';

import { postCreateGuest } from '@/api/guest';

import useUserStore from '@/stores/userStore';

const useCreateGuestMutation = () => {
  const { setGuestMode } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: () => postCreateGuest(),

    onSuccess: (data) => {
      const userId = data.headers.location.slice(-3);
      const accessToken = data.headers.authorization;
      const refreshToken = data.headers.refresh;
      const displayName = `게스트 ${userId}`;
      const profileImageUrl = '/assets/img/bg_default_profile.png';

      setGuestMode({
        userId,
        accessToken,
        refreshToken,
        displayName,
        profileImageUrl,
      });

      window.location.reload();

      window.location.href = '/';
    },
  });

  return { mutate };
};

export default useCreateGuestMutation;
