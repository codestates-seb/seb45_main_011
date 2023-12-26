'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ErrorMessage } from '@hookform/error-message';

import useAddGuestbookMutation from '@/hooks/mutation/useAddGuestbookMutation';

import CommentProfileImage from './CommentProfileImage';

import { CommentInputValue } from '@/types/common';

import { COMMENT } from '@/constants/contents';

export default function CommentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentInputValue>();
  const { mutate: addGuestbook } = useAddGuestbookMutation();

  const submitCommentForm = (data: CommentInputValue) => {
    addGuestbook(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitCommentForm)}
      className="relative p-5 w-full h-[90px] flex justify-between items-center gap-3 bg-contain bg-center bg-[url('/assets/img/bg_wood_dark.png')] border-[3px] border-brown-70 rounded-lg shadow-outer/down mb-6 max-[560px]:p-3 max-[560px]:gap-2 max-[560px]:h-[74px]">
      <CommentProfileImage />
      <input
        className="px-[1.125rem] w-full py-[0.6875rem] h-[36px] flex-1 rounded-[50px] text-[0.875rem] leading-[0.875rem] font-normal focus:outline-none shadow-outer/down max-[560px]:px-[0.8rem] max-[560px]:py-[0.4rem] max-[560px]:h-[32px] max-[500px]:text-[0.7rem] "
        placeholder="댓글을 입력하세요."
        required
        {...register('comment', {
          maxLength: {
            value: COMMENT.maxLength.value,
            message: COMMENT.maxLength.errorMessage,
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name={'comment'}
        render={({ message }) => (
          <div className="absolute w-full -bottom-5 text-[0.6rem] leading-3 text-red-50 text-center">
            {message}
          </div>
        )}
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
