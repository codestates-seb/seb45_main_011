import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addGuestbook } from '@/api/garden';

import useUserStore from '@/stores/userStore';

import { CommentInputValue } from '@/types/common';

const useAddGuestbookMutation = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const { userId } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: ({ comment }: CommentInputValue) =>
      addGuestbook(id as string, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestbook', userId] });
    },
  });

  return { mutate };
};

export default useAddGuestbookMutation;
