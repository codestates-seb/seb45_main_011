'use client';

import { useQuery } from '@tanstack/react-query';

import { findPostById } from '@/api/post';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import PostForm from '@/components/post/PostForm';

import { RawPostInfo } from '@/types/data';

interface EditPostProps {
  params: { id: string };
}

export default function EditPost({ params }: EditPostProps) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<RawPostInfo>(['post'], () => findPostById(params.id));

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="relative flex flex-col items-center min-w-[328px] max-w-[531px] mt-[52px] mx-auto border-gradient rounded-xl bg-repeat shadow-outer/down max-[563px]:mx-4">
      <PageTitle text="게시글 수정" className="mt-5 mb-7" />
      <PostForm post={post} postId={params.id} mode="edit" />
      <Screws />
    </div>
  );
}
