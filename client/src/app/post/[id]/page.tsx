'use client';

import { useQuery } from '@tanstack/react-query';

import { getPostByBoardId } from '@/api/board';

import usePostModalStore from '@/stores/postModalStore';
import useTestUserStore from '@/stores/testUserStore';

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
import HashTags from '@/components/post/HashTags';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const boardId = params.id;

  const { userId } = useTestUserStore();
  const { isOpen } = usePostModalStore();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(['post', boardId], () => getPostByBoardId(boardId), {
    enabled: !!userId,
  });

  if (isError) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;

  return (
    <main className="mt-[60px] pt-[52px] flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[864px] border-gradient rounded-xl">
        <div className="h-full px-5 py-5">
          <Screws />
          <div className="relative h-full pl-7 flex flex-col   ">
            <PageTitle text={post.title} />
            <div className="w-full flex justify-between items-center mb-4">
              <PostProfile
                displayName={post.displayName}
                userId={post.accountId}
                profileImageUrl={post.profileImageUrl}
                grade="브론즈 가드너"
                usage="post"
              />
              <DateAndControl
                date={new Date()}
                usage="post"
                targetId={post.boardId}
              />
            </div>
            <div className="relative pr-5 flex flex-col overflow-y-scroll scrollbar">
              <div className="px-[1.875rem] py-[1.625rem] w-full bg-brown-10 border-2 border-brown-50 rounded-lg mb-8 common-drop-shadow ">
                <PostImage src={post.boardImageUrl} />
                <PostContent content={post.content} />
                <HashTags hashTags={post.hashTags} />
              </div>
              <PostCountInfo
                likesNum={post.likeNum}
                commentNum={post.commentLikeNum}
                isLike={false}
                usage="post"
                className="mb-3"
              />
              <CommentForm boardId={post.boardId} />
              {post.comments.map((comment: any) => (
                <Comment key={comment.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <PostDeleteModal postId={params.id} />}
    </main>
  );
}
