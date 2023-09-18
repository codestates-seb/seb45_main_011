'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { findPostById } from '@/api/post';

import ErrorNotice from '@/components/common/ErrorNotice';
import LoadingNotice from '@/components/common/LoadingNotice';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import PostForm from '@/components/post/PostForm';
import Footer from '@/components/common/Footer';

import { RawPostInfo } from '@/types/data';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface EditPostProps {
  params: { id: string };
}

export default function EditPost({ params }: EditPostProps) {
  const postId = params.id;

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<RawPostInfo>(['edit', postId], () => findPostById(params.id));

  if (isError) return <ErrorNotice isTransparent={false} className="mx-auto" />;

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="h-auto min-h-full pb-[343px]">
        <div className="relative flex flex-col items-center min-w-[328px] max-w-[531px] mx-auto border-gradient rounded-xl bg-repeat shadow-container max-[563px]:mx-4">
          {isLoading ? (
            <LoadingNotice
              isTransparent={true}
              className="flex items-center h-[704px]"
            />
          ) : (
            <>
              <PageTitle text="게시글 수정" className="mt-5 mb-7" />
              <PostForm post={post} postId={params.id} mode="edit" />
            </>
          )}
          <Screws />
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
