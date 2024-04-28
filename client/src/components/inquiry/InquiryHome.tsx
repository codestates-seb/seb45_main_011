'use client';

import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import useChatStore from '@/stores/chatStore';
import useUserStore from '@/stores/userStore';

import useCreateChatRoomMutation from '@/hooks/mutation/useCreateChatRoomMutation';
import useDeleteGuestMutation from '@/hooks/mutation/useDeleteGuestMutation';

import { TitleInput } from '.';
import { CommonButton } from '../common';

import { CUSTOMER_SERVICE } from '@/constants/contents';

import checkForToken from '@/utils/checkForToken';

interface HomeProps {
  isNewChat: boolean;
  setIsNewChat: Dispatch<SetStateAction<boolean>>;
  newChat: () => void;
}

export default function InquiryHome({
  isNewChat,
  setIsNewChat,
  newChat,
}: HomeProps) {
  const router = useRouter();

  const { title, setTitle } = useChatStore();
  const { setClear, isGuestMode } = useUserStore();

  const { mutate } = useCreateChatRoomMutation(title);
  const { mutate: onDeleteGuest } = useDeleteGuestMutation();

  const { authVerify } = checkForToken();

  const onCreateChat = () => {
    if (authVerify() === 'Access Token Expired') {
      if (isGuestMode) {
        onDeleteGuest();
      }

      return (
        alert('토큰이 만료되었습니다. 다시 로그인 해주시길 바랍니다.'),
        setTitle(''),
        setClear(),
        router.push('/signin')
      );
    }

    mutate();
    setTitle('');
  };

  return (
    <section className="pt-5 h-[83%]">
      <div>
        <h1 className="text-lg text-center px-3">
          <b>무엇을 도와드릴까요?</b>
        </h1>

        <h2 className="text-center text-[14px] break-words my-2 leading-[18px] px-3">
          <p>이용에 관한 문의가 있으시다면</p>

          <p>
            <b>문의하기</b>&nbsp;버튼을 눌러주세요.
          </p>
        </h2>

        <div className="mt-3">
          {CUSTOMER_SERVICE.notification.map((notice) => (
            <ul key={notice} className="pl-4 text-[10px]">
              <li className="list-disc my-2 whitespace-pre">{notice}</li>
            </ul>
          ))}
        </div>

        <div className="flex justify-center pt-[18px]">
          {isNewChat ? (
            <TitleInput
              title={title}
              setTitle={setTitle}
              sendTitle={onCreateChat}
              newChat={newChat}
            />
          ) : (
            <CommonButton
              type="button"
              size="md"
              className="py-2 px-2"
              onClick={() => setIsNewChat(true)}>
              문의하기
            </CommonButton>
          )}
        </div>
      </div>
    </section>
  );
}
