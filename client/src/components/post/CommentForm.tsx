'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import useAddCommentMutation from '@/hooks/useAddCommentMutation';

import CommentProfileImage from './CommentProfileImage';

import { CommentInputValue } from '@/types/common';

interface CommentFormProps {
  boardId: string;
}

export default function CommentForm({ boardId }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentInputValue>();
  const { mutate: addComment } = useAddCommentMutation({ boardId });

  const submitCommentForm = (data: CommentInputValue) => {
    addComment(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submitCommentForm)}
      className="p-5 w-full h-[90px] flex justify-between items-center gap-3 bg-contain bg-center bg-[url('/assets/img/bg_wood_dark.png')] border-[3px] border-brown-70 rounded-lg shadow-outer/down mb-6 max-[560px]:p-3 max-[560px]:gap-2 max-[560px]:h-[74px]">
      <CommentProfileImage />
      <input
        className="px-[1.125rem] w-full py-[0.6875rem] h-[36px] flex-1 rounded-[50px] text-[0.875rem] leading-[0.875rem] font-normal focus:outline-none shadow-outer/down max-[560px]:px-[0.8rem] max-[560px]:py-[0.4rem] max-[560px]:h-[32px] max-[500px]:text-[0.7rem] "
        placeholder="댓글을 입력하세요."
        required
        {...register('comment', {
          maxLength: {
            value: 200,
            message: '최대 200자를 넘을 수 없습니다.',
          },
        })}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-[0.6875rem] py-[0.5625rem] bg-contain bg-center bg-[url('/assets/img/bg_wood_light.png')] border-[3px] border-brown-50 rounded-xl text-[1rem] leading-[1rem] font-bold text-brown-40 shadow-outer/down max-[560px]:text-[0.85rem] max-[560px]:px-[0.55rem] max-[560px]:py-[0.5rem]  max-[500px]:text-[0.8rem] max-[500px]:px-[0.4rem]  max-[500px]:py-[0.3rem]"
        type="submit"
        disabled={isSubmitting}>
        등록
      </motion.button>
    </form>
  );
}
