'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import useChatMessageQuery from '@/hooks/query/useChatMessageQuery';

import { ChatInput, ChatBox } from '.';

import { Chat } from '@/types/data';

import checkForToken from '@/utils/checkForToken';

interface ChatProps {
  role: 'user' | 'admin';
}

export default function Chat({ role }: ChatProps) {
  const client = useRef<CompatClient>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState<Chat[]>([]);

  const router = useRouter();

  const { roomId, message, setMessage } = useChatStore();
  const { accessToken, refreshToken, userId, displayName, setClear } =
    useUserStore();

  const {
    data: messageList,
    fetchNextPage,
    hasNextPage,
  } = useChatMessageQuery(roomId);

  const { authVerify } = checkForToken();

  const url = process.env.NEXT_PUBLIC_API_URL;

  let subscription: StompSubscription | undefined;

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
    if (messageList) {
      messageList.map((list) => setChat([...list.previousMessage]));
    }
  }, [messageList]);

  useEffect(() => {
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

        setConnected(true);
      },
    );

    return () => {
      client.current?.disconnect(() => {
        subscription?.unsubscribe();
        setConnected(false);
      });
    };
  }, []);

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
          <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}>
            <ChatBox chat={chat} user={displayName} role={role} />
          </InfiniteScroll>
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
