import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editComment } from '@/api/board';

import { CommentInputValue } from '@/types/common';

interface useEditCommentMutaionParameters {
  targetId: string | null;
  boardId: string;
}
const useEditCommentMutation = ({
  targetId,
  boardId,
}: useEditCommentMutaionParameters) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (inputs: CommentInputValue) =>
      editComment(targetId as string, inputs.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', boardId] });
    },
  });

  return { mutate };
};

export default useEditCommentMutation;
