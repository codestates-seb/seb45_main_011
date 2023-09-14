import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editLeaf } from '@/api/leaf';

import useUserStore from '@/stores/userStore';

import { InputValues } from '@/types/common';

interface useEditLeafMutationPatameters {
  leafId: string;
  isImageUpdated: boolean;
}

const useEditLeafMutaion = ({
  leafId,
  isImageUpdated,
}: useEditLeafMutationPatameters) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { userId } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: (inputs: InputValues) =>
      editLeaf({ inputs, leafId, isImageUpdated }),
    onSuccess: () => {
      router.push(`/leafs/${userId}`);
      queryClient.invalidateQueries({ queryKey: ['leafs'] });
    },
  });

  return { mutate };
};

export default useEditLeafMutaion;
