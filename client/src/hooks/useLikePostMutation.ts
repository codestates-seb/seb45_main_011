import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likeBoard } from '@/api/board';

const useLikePostMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => likeBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', boardId] });
    },
  });

  return { mutate };
};

export default useLikePostMutation;
