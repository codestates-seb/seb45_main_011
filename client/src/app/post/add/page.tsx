'use client';

import { motion } from 'framer-motion';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import Footer from '@/components/common/Footer';
import PostForm from '@/components/post/PostForm';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function AddPost() {
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
