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
        textAreaRef.current?.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <textarea
      className="w-full bg-transparent resize-none active:outline-none focus:outline-none"
      value={content}
      readOnly
      rows={1}
      ref={textAreaRef}
    />
  );
}
