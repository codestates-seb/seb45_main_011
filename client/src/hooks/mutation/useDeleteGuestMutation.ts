import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/api/history';

import useUserStore from '@/stores/userStore';

import removeCookiesForUserId from '@/utils/removeCookiesForUserId';

const useDeleteGuestMutation = () => {
  const router = useRouter();

  const { setClear } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(),

    onSuccess: () => {
      removeCookiesForUserId();
      setClear();

      router.push('/');
    },
  });

  return { mutate };
};

export default useDeleteGuestMutation;
