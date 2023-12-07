'use client';

import { Dispatch, SetStateAction } from 'react';

import useChatStore from '@/stores/chatStore';

import useCreateChatRoomMutation from '@/hooks/mutation/useCreateChatRoomMutation';

import { TitleInput } from '.';
import { CommonButton } from '../common';

import { CUSTOMER_SERVICE } from '@/constants/contents';

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
  const { title, setTitle } = useChatStore();

  const { mutate } = useCreateChatRoomMutation(title);

  const onCreateChat = () => {
    mutate();
    setTitle('');
  };

  return (
    <div className="pt-5 h-[83%]">
      <section>
        <p className="text-lg text-center px-3">
          <b>무엇을 도와드릴까요?</b>
        </p>

        <div className="text-center text-[14px] break-words my-2 leading-[18px] px-3">
          <p>이용에 관한 문의가 있으시다면</p>
          <p>
            <b>문의하기</b> 버튼을 눌러주세요.
          </p>
        </div>

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
      </section>
    </div>
  );
}
