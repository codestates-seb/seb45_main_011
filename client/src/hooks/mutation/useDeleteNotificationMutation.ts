import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotification } from '@/api/notification';

const useDeleteNotificationMutation = (
  notificationId: string,
  userId: string,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
    },
  });

  return { mutate };
};

export default useDeleteNotificationMutation;
