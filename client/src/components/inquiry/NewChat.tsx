'use client';

import { useEffect, useRef, useState } from 'react';

import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import { ChatInput, ChatBox } from '.';

import { Chat } from '@/types/data';

interface NewChatProps {
  role: 'user' | 'admin';
}

export default function NewChat({ role }: NewChatProps) {
  const client = useRef<CompatClient>();

  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState<Chat[]>([]);

  const { message, setMessage, roomId } = useChatStore();
  const { accessToken, refreshToken, displayName, userId } = useUserStore();

  const url = process.env.NEXT_PUBLIC_API_URL;

  let subscription: StompSubscription | undefined;

  const entryMessage = () => {
    const adminId = 101;

    client?.current?.send(
      `/pub/chatRoom/enter`,
      {},
      JSON.stringify({ senderId: +userId, chatRoomId: +roomId, adminId }),
    );
  };

  const sendMessage = () => {
    if (message === '') return;

    const newMessge = {
      senderId: +userId,
      chatRoomId: roomId,
      message,
    };

    client?.current?.send(`/pub/chatRoom/send`, {}, JSON.stringify(newMessge));
    setMessage('');
  };

  useEffect(() => {
    if (roomId) {
      client.current = Stomp.over(() => new SockJS(`${url}/wss`));

      client.current.connect(
        {
          Authorization: accessToken,
          refresh: refreshToken,
        },
        () => {
          subscription = client?.current?.subscribe(
            `/sub/chatRoom/${roomId}`,
            (payload) => {
              const receivedMessage: Chat = JSON.parse(payload.body);

              setChat((previousChat) => [...previousChat, receivedMessage]);
            },
          );

          entryMessage();
          setConnected(true);
        },
      );
    }

    return () => {
      client.current?.disconnect(() => {
        subscription?.unsubscribe();
        setConnected(false);
      });
    };
  }, [roomId]);

  return (
    <section className="w-full">
      <div
        className={`${CHAT_STYLE[role]} rounded-lg bg-brown-80 border-brown-90 border-[1px] w-[220px] h-[232px] flex flex-col justify-between mb-[7px]`}>
        <ChatBox chat={chat} user={displayName} role={role} />

        <ChatInput
          connected={connected}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          role={role}
        />
      </div>
    </section>
  );
}

const CHAT_STYLE = {
  user: 'w-[220px] h-[232px] mb-[7px]',
  admin: 'lg:w-[392px] sm:w-[312px] h-[327px]',
};
