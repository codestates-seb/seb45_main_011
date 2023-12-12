import { useMutation } from '@tanstack/react-query';

import { patchChatAnsweredById, sendAnsweredById } from '@/api/chat';

import useChatStore from '@/stores/chatStore';

const useUpdateChatAnsweredMutation = () => {
  const { roomId, questionerId, title } = useChatStore();

  const { mutate } = useMutation({
    mutationFn: () => patchChatAnsweredById(roomId),

    onSuccess: async () => {
      await sendAnsweredById(roomId, questionerId, title);
    },
  });

  return { mutate };
};

export default useUpdateChatAnsweredMutation;
