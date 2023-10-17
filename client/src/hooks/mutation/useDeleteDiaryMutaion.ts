import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDiary } from '@/api/leaf';

const useDeleteDiaryMutation = (leafId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {
      queryClient.invalidateQueries(['diaries', leafId]);
    },
  });

  return { mutate };
};

export default useDeleteDiaryMutation;
