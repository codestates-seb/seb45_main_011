import { KeyboardEvent } from 'react';

interface ChatInputProps {
  connected: boolean;
  message: string;
  role: 'user' | 'admin';

  setMessage: (message: string) => void;
  sendMessage: () => void;
}

export default function ChatInput({
  connected,
  message,
  role,
  setMessage,
  sendMessage,
}: ChatInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message !== '') {
      event.nativeEvent.isComposing === false && sendMessage();
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 mb-2 mx-2">
      <input
        type="text"
        value={message}
        placeholder={connected ? '메시지를 입력하세요.' : '연결 중입니다...'}
        disabled={!connected}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        className={`${CHAT_INPUT_STYLE[role].input} rounded-[50px] px-2`}
      />

      <button
        type="submit"
        onClick={sendMessage}
        disabled={!connected}
        className={`${CHAT_INPUT_STYLE[role].submit} flex justify-center items-center text-xs text-brown-40 font-bold  border-brown-50 rounded-xl border-2 bg-contain bg-center bg-repeat bg-[url('/assets/img/bg_wood_light.png')] shadow-outer/down`}>
        전송
      </button>
    </div>
  );
}

const CHAT_INPUT_STYLE = {
  user: {
    input: 'w-[155px] h-[26px] text-[12px]',
    submit: 'w-[43px] h-[28px]',
  },

  admin: {
    input: 'w-full h-[30px] text-[14px]',
    submit: 'w-[47px] h-[35px]',
  },
};
