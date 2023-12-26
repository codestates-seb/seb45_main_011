'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';
import useBoardStore from '@/stores/boardStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import {
  BoardBanner,
  BoardSearchForm,
  RankBoard,
  PostList,
  SearchList,
} from '@/components/board';
import { InquiryButton } from '@/components/inquiry';
import { CommonButton, Footer, NotificationButton } from '@/components/common';

export default function Board() {
  const router = useRouter();

  const userId = useUserStore((state) => state.userId);

  const { searchKey, setSearchKey } = useBoardStore();

  useEffectOnce(() => setSearchKey(null));

  const navigateToAddPost = () => {
    if (userId !== null) return router.push('/post/add');
    return router.push('/signin');
  };

  return (
    <>
      <div className="h-auto min-h-full pt-[120px] pb-[343px] px-4 flex flex-col gap-5 justify-center items-center max-[415px]:gap-4 max-[605px]:pt-[80px] ">
        <RankBoard />
        <BoardBanner />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full min-w-[312px] max-w-[720px] h-[487px] border-gradient rounded-xl shadow-container">
          <div className="p-4 h-full flex flex-col gap-4">
            <div className="flex justify-between">
              <BoardSearchForm />
              <CommonButton type="button" size="sm" onClick={navigateToAddPost}>
                글 쓰기
              </CommonButton>
            </div>
            {searchKey ? <SearchList /> : <PostList />}
          </div>
        </motion.div>
      </div>
      <NotificationButton />

      <InquiryButton />
      <Footer />
    </>
  );
}
