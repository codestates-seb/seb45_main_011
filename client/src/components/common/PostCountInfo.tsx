'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';

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
  const router = useRouter();

  const { userId } = useUserStore();

  const { mutate: likePost } = useLikePostMutation(boardId as string);

  return (
    <div className={`flex gap-3 ${className}`}>
      {usage === 'post' ? (
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex gap-[0.375rem] ml-[2px]"
          role="button"
          onClick={() => {
            if (!userId) {
              alert('로그인이 필요한 기능입니다.');
              return router.push('/signin');
            }
            return likePost();
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
        </motion.span>
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
          style={{ width: 19, height: 16 }}
        />
        {commentNum}
      </span>
    </div>
  );
}
