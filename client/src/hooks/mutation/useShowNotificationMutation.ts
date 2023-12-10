import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showNotification } from '@/api/notification';

const useShowNotificationMutation = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => showNotification(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
    },
  });

  return { mutate };
};

export default useShowNotificationMutation;
