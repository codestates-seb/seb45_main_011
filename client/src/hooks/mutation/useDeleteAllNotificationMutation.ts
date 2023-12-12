import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAllNotification } from '@/api/notification';

const useDeleteAllNotificationMutation = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteAllNotification(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
    },
  });

  return { mutate };
};

export default useDeleteAllNotificationMutation;
