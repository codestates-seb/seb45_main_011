import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { postCreateGuest } from '@/api/guest';

import useUserStore from '@/stores/userStore';

const useCreateGuestMutation = () => {
  const router = useRouter();

  const { setGuestMode } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: () => postCreateGuest(),

    onSuccess: (data) => {
      const userId = data.headers.location.slice(-3);
      const accessToken = data.headers.authorization;
      const refreshToken = data.headers.refresh;

      setGuestMode(userId, accessToken, refreshToken);

      router.push('/');
    },
  });

  return { mutate };
};

export default useCreateGuestMutation;
