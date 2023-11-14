import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addLeaf } from '@/api/leaf';

import useUserStore from '@/stores/userStore';

const useAddLeafMutaion = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { userId } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: addLeaf,
    onSuccess: () => {
      router.push(`/leafs/${userId}`);
      queryClient.invalidateQueries({ queryKey: ['leafs'] });
    },
  });

  return { mutate };
};

export default useAddLeafMutaion;
