'use client';

import { useEffect } from 'react';

import useChatStore from '@/stores/chatStore';

import { ChatInfo } from '@/types/data';

interface ChatBoxProps {
  chat: ChatInfo[];
  user: string;
  role: 'user' | 'admin';
}

export default function ChatBox({ chat, user, role }: ChatBoxProps) {
  const { setQuestionerId } = useChatStore();

  useEffect(() => {
    if (chat && role === 'admin') {
      const getQuestionerId = (chat: ChatInfo[]) => {
        return chat.map(
          (data) =>
            data.senderId !== 101 && setQuestionerId(`${data.senderId}`),
        );
      };

      getQuestionerId(chat);
    }
  }, [chat]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden">
      {chat?.map((message, index) => (
        <div
          key={message.messageId + index}
          className={`${CHAT_BOX_STYLE[role].container}`}>
          {message.senderName === user ? (
            <div
              className={`${CHAT_BOX_STYLE[role].width} flex flex-col items-end mx-3 mt-2`}>
              <p
                className={`${CHAT_BOX_STYLE[role].name} w-fit text-brown-10 pt-[6px] pb-1`}>
                <b>{user}</b>
              </p>

              <p
                className={`${CHAT_BOX_STYLE[role].box} w-fit bg-blue-10 px-3 py-2 mb-2 rounded-[4px] shadow-outer/down`}>
                {message.message}
              </p>
            </div>
          ) : (
            <div className={`${CHAT_BOX_STYLE[role].width} mx-3 mt-2`}>
              <p
                className={`${CHAT_BOX_STYLE[role].name} w-fit text-brown-10 pt-[6px] pb-1`}>
                <b>{message.senderName}</b>
              </p>

              <p
                className={`${CHAT_BOX_STYLE[role].box} w-fit bg-yellow-50 px-3 py-2 mb-2 rounded-[4px] shadow-outer/down`}>
                {message.message}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const CHAT_BOX_STYLE = {
  user: {
    container: 'w-full',
    width: 'w-[90%]',
    name: 'text-[12px]',
    box: 'text-[11px] px-3 py-2',
  },

  admin: {
    container: 'w-auto',
    width: 'w-auto',
    name: 'text-[14px]',
    box: 'text-[12px]',
  },
};
