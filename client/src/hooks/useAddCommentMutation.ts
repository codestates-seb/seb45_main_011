import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '@/api/board';
import { CommentInputValue } from '@/types/common';

interface useAddCommentMutaionParameters {
  boardId: number;
}
const useAddCommentMutation = ({ boardId }: useAddCommentMutaionParameters) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ comment }: CommentInputValue) =>
      addComment(comment, boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', Number(boardId)] });
    },
  });

  return { mutate };
};

export default useAddCommentMutation;
