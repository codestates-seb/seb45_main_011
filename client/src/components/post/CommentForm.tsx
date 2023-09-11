'use client';

import { useForm } from 'react-hook-form';

import CommentProfileImage from './CommentProfileImage';

export default function CommentForm() {
  const { register, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="p-5 w-full flex justify-between items-center gap-3 bg-contain bg-center bg-[url('/assets/img/bg_wood_dark.png')] border-[3px] border-brown-70 rounded-lg common-drop-shadow mb-6">
      <CommentProfileImage src="" />
      <input
        className="px-[1.125rem] py-[0.6875rem] h-[36px] flex-1 rounded-[50px] text-[0.875rem] leading-[0.875rem] font-normal focus:outline-none"
        placeholder="댓글을 입력하세요."
        {...register('comment')}
      />
      <button
        className="px-[0.6875rem] py-[0.5625rem] w-[60px] bg-contain bg-center bg-[url('/assets/img/bg_wood_light.png')] border-[3px] border-brown-50 rounded-xl text-[1rem] leading-[1rem] font-bold text-brown-40"
        type="submit">
        등록
      </button>
    </form>
  );
}
