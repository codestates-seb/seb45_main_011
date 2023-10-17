import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLeaf } from '@/api/leaf';

const useDeleteLeafMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteLeaf,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leafs'] });
    },
  });

  return { mutate };
};

export default useDeleteLeafMutation;
