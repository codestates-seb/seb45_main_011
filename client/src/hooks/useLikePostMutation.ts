import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likeBoard } from '@/api/board';

const useLikePostMutation = (boardId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: likeBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', boardId] });
    },
  });

  return { mutate };
};

export default useLikePostMutation;
