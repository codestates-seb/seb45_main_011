'use client';

import Image from 'next/image';

import useChatStore from '@/stores/chatStore';

import { ChatList } from '@/types/data';

import checkForToken from '@/utils/checkForToken';

interface InquiryRoomProps {
  chatList: ChatList;
}

export default function InquiryRoom({ chatList }: InquiryRoomProps) {
  const { setSelected, setRoomId } = useChatStore();

  const { authVerify } = checkForToken();

  const onChatRoomById = (chatRoomId: number) => {
    if (authVerify() === 'Access Token Expired') {
      return alert(
        '토큰이 만료되었습니다. 로그아웃 후 다시 로그인 해주시길 바랍니다.',
      );
    }

    setSelected('chat');
    setRoomId(`${chatRoomId}`);
  };

  return (
    <div
      key={chatList.chatRoomId}
      className="bg-brown-80 rounded borde r-[1px]border-brown-90 px-1 py-1 flex justify-center items-center cursor-pointer text-brown-10 mb-1"
      onClick={() => onChatRoomById(chatList.chatRoomId)}>
      <Image
        src="/assets/img/bg_default_profile.png"
        width={30}
        height={30}
        alt="profile image"
        className="w-[30px] h-[30px] object-cover rounded-full border-2 border-brown-50"
      />

      <div className="pl-1 flex flex-col text-[10px]">
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs">
            <b>{chatList.otherAccountName}</b>
          </p>
          <p>{chatList.latestTime}</p>
        </div>

        <div className="w-[175px] py-1">
          <p className="overflow-hidden whitespace-nowrap text-ellipsis break-words">
            {chatList.latestMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
