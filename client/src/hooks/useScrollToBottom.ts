import { useEffect, useRef } from 'react';

import { ChatInfo } from '@/types/data';

const useScrollToBottom = (chat: ChatInfo[]) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat]);

  return scrollRef;
};

export default useScrollToBottom;
