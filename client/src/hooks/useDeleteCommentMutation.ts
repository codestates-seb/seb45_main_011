import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '@/api/board';
import { CommentInputValue } from '@/types/common';

interface useDeleteCommentMutaionParameters {
  commentId: number;
}
const useDeleteCommentMutation = ({
  commentId,
}: useDeleteCommentMutaionParameters) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ comment }: CommentInputValue) =>
      addComment(comment, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', Number(commentId)] });
    },
  });

  return { mutate };
};

export default useDeleteCommentMutation;
