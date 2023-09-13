import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editComment } from '@/api/board';

import { CommentInputValue } from '@/types/common';

interface useEditCommentMutaionParameters {
  targetId: number | null;
  boardId: number;
}
const useEditCommentMutation = ({
  targetId,
  boardId,
}: useEditCommentMutaionParameters) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (inputs: CommentInputValue) =>
      editComment(targetId as number, inputs.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', Number(boardId)] });
    },
  });

  return { mutate };
};

export default useEditCommentMutation;
