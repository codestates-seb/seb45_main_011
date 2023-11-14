'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import Footer from '@/components/common/Footer';
import PostForm from '@/components/post/PostForm';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function AddPost() {
  const router = useRouter();

  const { userId } = useUserStore();

  const isClient = useClient();

  if (isClient && !userId) {
    alert('로그인이 필요한 기능입니다.');
    return router.push('/signin');
  }

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="h-auto min-h-full pb-[343px]">
        <div className="relative flex flex-col items-center min-w-[328px] max-w-[531px] mx-auto border-gradient rounded-xl bg-repeat shadow-container max-[563px]:mx-4">
          <PageTitle text="게시글 등록" className="mt-5 mb-7" />
          <PostForm mode="add" />
          <Screws />
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
