'use client';

import { useRouter } from 'next/navigation';

import useTestUserStore from '@/stores/testUserStore';

import BoardBanner from '@/components/board/BoardBanner';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import RankBoard from '@/components/board/RankBoard';
import CommonButton from '@/components/common/CommonButton';
import PostList from '@/components/board/PostList';

export default function Board() {
  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);

  const navigateToAddPost = () => {
    if (userId !== null) return router.push('/post/add');
    return router.push('/signin');
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <RankBoard />
      <BoardBanner />
      <div className="w-full max-w-[720px] h-[487px] border-gradient">
        <div className="p-4 h-full flex flex-col gap-6">
          <div className="flex justify-between">
            <BoardSearchForm />
            <CommonButton type="button" size="sm" onClick={navigateToAddPost}>
              글 쓰기
            </CommonButton>
          </div>
          <PostList />
        </div>
      </div>
    </div>
  );
}
