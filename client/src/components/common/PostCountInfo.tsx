'use client';

import Image from 'next/image';

import useLikePostMutation from '@/hooks/useLikePostMutation';

import { DefaultProps } from '@/types/common';

interface PostCountInfoProps extends DefaultProps {
  likesNum: number;
  commentNum: number | null;
  usage: 'board' | 'post';
  liked?: boolean;
  boardId?: string;
}

export default function PostCountInfo({
  likesNum,
  commentNum,
  liked,
  usage,
  className,
  boardId,
}: PostCountInfoProps) {
  const { mutate: likePost } = useLikePostMutation(boardId as string);

  return (
    <div className={`flex gap-3 ${className}`}>
      {usage === 'post' ? (
        <span
          className="flex gap-[0.375rem]"
          role="button"
          onClick={() => {
            likePost();
          }}>
          {liked ? (
            <Image
              src="/assets/img/like.svg"
              alt="좋아요 개수"
              width={19}
              height={16}
            />
          ) : (
            <Image
              src="/assets/img/unlike.svg"
              alt="좋아요 개수"
              width={19}
              height={16}
            />
          )}
          {likesNum}
        </span>
      ) : (
        <span className="flex gap-[0.375rem]">
          <Image
            src="/assets/img/like.svg"
            alt="좋아요 개수"
            width={19}
            height={16}
          />

          {likesNum}
        </span>
      )}

      <span className="flex gap-[0.375rem] text-base leading-4 text-brown-70">
        <Image
          src="/assets/img/comment.svg"
          alt="댓글 개수"
          width={19}
          height={16}
        />
        {commentNum}
      </span>
    </div>
  );
}
