'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import { ChatInput, ChatBox } from '.';

import { Chat } from '@/types/data';

import checkForToken from '@/utils/checkForToken';

interface NewChatProps {
  role: 'user' | 'admin';
}

export default function NewChat({ role }: NewChatProps) {
  const client = useRef<CompatClient>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState<Chat[]>([]);

  const router = useRouter();

  const { message, setMessage, roomId } = useChatStore();
  const { accessToken, refreshToken, displayName, userId, setClear } =
    useUserStore();

  const { authVerify } = checkForToken();

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

  const newMessge = {
    senderId: +userId,
    chatRoomId: roomId,
    message,
  };

  const sendMessage = () => {
    if (message === '') return;

    if (
      authVerify() === 'Access Token Expired' ||
      authVerify() === 'Refresh Token Expired'
    ) {
      return (
        alert(
          '토큰이 만료되었습니다. 로그아웃 후 다시 로그인 해주시길 바랍니다.',
        ),
        setConnected(false),
        setClear(),
        setMessage(''),
        router.push('/signin')
      );
    }

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

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat]);

  return (
    <section className="w-full">
      <div
        className={`${CHAT_STYLE[role]} rounded-lg bg-brown-80 border-brown-90 border-[1px] w-[220px] h-[232px] flex flex-col justify-between mb-[7px]`}>
        <div
          className="overflow-x-hidden overflow-y-scroll scrollbar"
          ref={scrollRef}>
          <ChatBox chat={chat} user={displayName} role={role} />
        </div>

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
