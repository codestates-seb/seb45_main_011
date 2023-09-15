import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '@/api/board';

interface useDeleteCommentMutaionParameters {
  targetId: string;
  boardId: string;
}
const useDeleteCommentMutation = ({
  targetId,
  boardId,
}: useDeleteCommentMutaionParameters) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteComment(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', boardId] });
    },
  });

  return { mutate };
};

export default useDeleteCommentMutation;
