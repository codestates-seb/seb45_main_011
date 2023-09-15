'use client';
import { useEffect, useRef } from 'react';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';

      textAreaRef.current.style.height =
        textAreaRef.current?.scrollHeight + 50 + 'px';

      textAreaRef.current.style.resize = 'none';
    }
  }, [textAreaRef.current?.style.height]);

  return (
    <textarea
      className=" w-full bg-transparent resize-none  overflow-hidden active:outline-none focus:outline-none  max-[500px]:text-[0.875rem]"
      value={content}
      readOnly
      rows={1}
      ref={textAreaRef}
    />
  );
}
