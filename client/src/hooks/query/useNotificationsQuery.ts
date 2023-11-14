import { useQuery } from '@tanstack/react-query';
import { getNotificationsByUserId } from '@/api/notification';

import { NotificationDataInfo } from '@/types/data';

export default function useNotificationsQuery(userId: string) {
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery<NotificationDataInfo[]>({
    queryKey: ['notifications', userId],
    queryFn: () => getNotificationsByUserId(userId),
    enabled: !!userId,
  });

  return {
    notifications,
    isLoading,
    isError,
  };
}
