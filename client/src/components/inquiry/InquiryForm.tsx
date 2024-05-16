'use client';

import { useState } from 'react';

import useChatStore from '@/stores/chatStore';

import { Chat, NewChat, InquiryHome, InquiryList } from '.';
import { CommonButton } from '../common';

export default function InquiryForm() {
  const [isNewChat, setIsNewChat] = useState(false);

  const { selected, setSelected, setRoomId, setIsOpen } = useChatStore();

  const newChat = () => {
    setRoomId('');
    setSelected('newChat');
  };

  const renderService = () => {
    if (selected === 'home')
      return (
        <InquiryHome
          isNewChat={isNewChat}
          setIsNewChat={setIsNewChat}
          newChat={newChat}
        />
      );

    if (selected === 'list') return <InquiryList />;

    if (selected === 'newChat') return <NewChat role="user" />;

    if (selected === 'chat') return <Chat role="user" />;
  };

  return (
    <>
      <div
        role="presentation"
        className="w-full h-screen fixed top-0 left-0 z-20"
        onClick={() => setIsOpen(false)}></div>

      <div className="absolute z-40 right-[50px] bottom-0 mx-2 flex flex-col items-center bg-brown-20 rounded-lg border-2 border-brown-50 shadow-outer/down w-60 h-[292px]">
        <div className="h-full flex flex-col justify-center">
          {renderService()}

          <nav role="navigation" className="flex justify-center gap-2">
            <CommonButton
              type="button"
              size="sm"
              className="px-4"
              onClick={() => {
                setSelected('home'), setIsNewChat(false);
              }}>
              홈
            </CommonButton>

            {selected !== 'list' && (
              <CommonButton
                type="button"
                size="sm"
                onClick={() => setSelected('list')}>
                대화 목록
              </CommonButton>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
