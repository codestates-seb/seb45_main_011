import { twMerge } from 'tailwind-merge';

import { ControlButton } from '.';

import useUserStore from '@/stores/userStore';

import useDeleteNotificationMutation from '@/hooks/mutation/useDeleteNotificationMutation';

import { NotificationDataInfo } from '@/types/data';

export default function NotificationMessage({
  id,
  type,
  num,
  isShow,
}: NotificationDataInfo) {
  const NOTIFICATION_MESSAGE = {
    writePost: {
      text: ['게시글 작성으로', ` ${num} 포인트 `, '획득'],
      accentClass: 'text-yellow-50',
      imgURL: '/assets/img/point.svg',
    },
    writeDiary: {
      text: ['일지 작성으로', ` ${num} 포인트 `, '획득'],
      accentClass: 'text-yellow-50',
      imgURL: '/assets/img/point.svg',
    },
    reportComment: {
      text: ['악성 댓글 작성으로', ` 신고 ${num}회 `, '누적'],
      accentClass: 'text-red-50',
      imgURL: '/assets/img/warning.svg',
    },
    reportPost: {
      text: ['악성 게시글 작성으로', ` 신고 ${num}회 `, '누적'],
      accentClass: 'text-red-50',
      imgURL: '/assets/img/warning.svg',
    },
    dailyQuiz: {
      text: ['일일 퀴즈를 맞추어', ` ${num} 포인트 `, '획득'],
      accentClass: 'text-yellow-50',
      imgURL: '/assets/img/point.svg',
    },
    signup: {
      text: ['회원가입 기념으로', ` ${num} 포인트를 `, '지급해 드렸습니다!'],
      accentClass: 'text-yellow-50',
      imgURL: '/assets/img/point.svg',
    },
    dailyLogin: {
      text: ['일일 로그인으로', ` ${num} 포인트 `, '획득'],
      accentClass: 'text-yellow-50',
      imgURL: '/assets/img/point.svg',
    },
  };

  const userId = useUserStore((state) => state.userId);

  const { mutate: deleteNotification } = useDeleteNotificationMutation(
    '' + id,
    userId,
  );

  const handleDelete = () => {
    deleteNotification();
  };

  return (
    <div
      className={twMerge(
        'relative p-[5px] w-[131px] border-[1px] border-brown-80 rounded-[4px] flex items-center gap-1 font-bold text-[10px] leading-[12px] text-brown-20 shadow-outer/down',
        isShow ? 'bg-gray-70' : 'bg-brown-70',
      )}>
      <img
        alt=""
        src={NOTIFICATION_MESSAGE[type].imgURL}
        className="w-[16px] h-[16px]"
      />
      <p className="pr-[21px]">
        {NOTIFICATION_MESSAGE[type].text[0]}
        <span className={NOTIFICATION_MESSAGE[type].accentClass}>
          {NOTIFICATION_MESSAGE[type].text[1]}
        </span>
        {NOTIFICATION_MESSAGE[type].text[2]}
      </p>
      <ControlButton usage="notificationDelete" handleClick={handleDelete} />
    </div>
  );
}
