'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import useChatMessageQuery from '@/hooks/query/useChatMessageQuery';
import useNewChatAndExistChatConnect from '@/hooks/useNewChatAndExistChatConnect';

import { ChatInput, ChatBox } from '.';

import checkForToken from '@/utils/checkForToken';

interface ChatProps {
  role: 'user' | 'admin';
}

export default function Chat({ role }: ChatProps) {
  const router = useRouter();

  const { roomId, message, isNewChatConnect, setMessage } = useChatStore();
  const { userId, displayName, setClear } = useUserStore();

  const { setConnected, setChat, client, scrollRef, chat, connected } =
    useNewChatAndExistChatConnect(isNewChatConnect);

  const {
    data: messageList,
    fetchNextPage,
    hasNextPage,
  } = useChatMessageQuery(roomId);

  const { authVerify } = checkForToken();

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
        alert('토큰이 만료되었습니다. 다시 로그인 해주시길 바랍니다.'),
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
  admin: 'w-full h-[327px]',
};
