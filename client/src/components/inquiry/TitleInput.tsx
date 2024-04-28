import { KeyboardEvent } from 'react';

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
  sendTitle: () => void;
  newChat: () => void;
}

export default function TitleInput({
  title,
  setTitle,
  sendTitle,
  newChat,
}: TitleInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && title !== '') {
      event.nativeEvent.isComposing === false && sendTitle(), newChat();
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 mb-2 mx-2">
      <input
        type="text"
        value={title}
        placeholder={'문의 제목을 적어주세요.'}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        className={`w-[155px] h-[28px] text-[12px] rounded-[50px] px-2 border-brown-70 border-2`}
      />

      <button
        type="submit"
        onClick={() => {
          sendTitle(), newChat();
        }}
        disabled={!title}
        className={`w-[43px] h-[28px] text-[12px] flex justify-center items-center text-brown-10 font-bold  border-brown-70 rounded-xl border-2 bg-contain bg-center bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] shadow-outer/down`}>
        입력
      </button>
    </div>
  );
}
