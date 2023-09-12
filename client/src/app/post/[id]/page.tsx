'use client';

import usePostModalStore from '@/stores/postModalStore';

import PostDeleteModal from '@/components/post/PostDeleteModal';
import PageTitle from '@/components/common/PageTitle';
import PostCountInfo from '@/components/common/PostCountInfo';
import Screws from '@/components/common/Screws';
import Comment from '@/components/post/Comment';
import CommentForm from '@/components/post/CommentForm';
import PostContent from '@/components/post/PostContent';
import DateAndControl from '@/components/post/PostDateAndControl';
import PostImage from '@/components/post/PostImage';
import PostProfile from '@/components/post/PostProfile';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const boardId = Number(params.id);
  const { isOpen } = usePostModalStore();
  return (
    <main className="mt-[60px] pt-[52px] flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[864px] border-gradient rounded-xl">
        <div className="h-full px-5 py-5">
          <Screws />
          <div className="relative h-full pl-7 flex flex-col   ">
            <PageTitle text="첫 바질!!!" />
            <div className="w-full flex justify-between items-center mb-4">
              <PostProfile
                displayName="관리자"
                userId={1}
                profileImageUrl="/assets/img/profile_hitmontop.png"
                grade="브론즈 가드너"
                usage="post"
              />
              <DateAndControl
                date={'2023/09/04'}
                usage="post"
                targetId={boardId}
              />
            </div>
            <div className="relative pr-5 flex flex-col overflow-y-scroll scrollbar">
              <div className="px-[1.875rem] py-[1.625rem] w-full bg-brown-10 border-2 border-brown-50 rounded-lg mb-8 common-drop-shadow ">
                <PostImage src={'/assets/img/profile_hitmontop.png'} />
                <PostContent content={`asda`} />
              </div>
              <PostCountInfo
                likesNum={200}
                commentNum={11}
                isLike={false}
                usage="post"
                className="mb-3"
              />
              <CommentForm />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </div>
        </div>
      </div>
      {isOpen && <PostDeleteModal postId={params.id} />}
    </main>
  );
}
