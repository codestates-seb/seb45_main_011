import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/api/history';

import useUserStore from '@/stores/userStore';

const useDeleteGuestMutation = () => {
  const router = useRouter();

  const { setClear } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(),

    onSuccess: () => {
      setClear();
      router.push('/');
    },
  });

  return { mutate };
};

export default useDeleteGuestMutation;
