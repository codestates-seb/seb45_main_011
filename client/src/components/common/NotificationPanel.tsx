import NotificationMessage from './NotificationMessage';

import useUserStore from '@/stores/userStore';
import useNotificationStore from '@/stores/notificationStore';

import useDeleteAllNotificationMutation from '@/hooks/mutation/useDeleteAllNotificationMutation';

import { NotificationDataInfo } from '@/types/data';

export default function NotificationPanel({
  notifications,
}: {
  notifications: NotificationDataInfo[] | undefined;
}) {
  const userId = useUserStore((state) => state.userId);
  const { setIsClicked } = useNotificationStore();

  const { mutate: deleteAllNotification } =
    useDeleteAllNotificationMutation(userId);

  const handleAllDelete = () => {
    deleteAllNotification();
    setIsClicked(false);
  };

  return (
    <div className="pr-[6px] absolute left-[-177px] bottom-0 w-[160px] h-[250px] border-2  border-brown-50 rounded-lg bg-[url('/assets/img/bg_wood_light.png')] flex items-center flex-col gap-2">
      <h3 className="inline-block mx-auto mt-[10px] py-[6px] px-[10px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-2 border-brown-70 rounded-lg font-bold text-[14px] leading-[14px] text-brown-10">
        알림 목록
      </h3>
      <div className="w-full h-full flex flex-col items-center gap-1 overflow-x-hidden overflow-y-scroll scrollbar">
        {notifications?.map((notification) => (
          <NotificationMessage
            key={notification.id}
            id={notification.id}
            type={notification.type}
            num={notification.num}
            isShow={notification.isShow}
          />
        ))}
      </div>
      <button
        className="w-fit px-[10px] py-[6px] font-bold text-sm leading-[14px] text-center text-brown-10 bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-2 border-brown-70 rounded-lg mb-[10px]"
        onClick={handleAllDelete}>
        전체 삭제
      </button>
    </div>
  );
}
