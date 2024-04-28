'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import useNewChatAndExistChatConnect from '@/hooks/useNewChatAndExistChatConnect';

import { ChatInput, ChatBox } from '.';

import checkForToken from '@/utils/checkForToken';

interface NewChatProps {
  role: 'user' | 'admin';
}

export default function NewChat({ role }: NewChatProps) {
  const router = useRouter();

  const { message, roomId, isNewChatConnect, setMessage } = useChatStore();
  const { displayName, userId, setClear } = useUserStore();

  const { setConnected, client, scrollRef, chat, connected } =
    useNewChatAndExistChatConnect(isNewChatConnect);

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
  admin: 'w-full h-[327px]',
};
