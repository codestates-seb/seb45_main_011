'use client';

import { useRouter } from 'next/navigation';

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
import DateAndControl from '@/components/post/DateAndControlSection';
import PostImage from '@/components/post/PostImage';
import PostProfile from '@/components/post/PostProfile';
import HashTags from '@/components/post/HashTags';
import CommentDeleteModal from '@/components/post/CommentDeleteModal';

import { CommentDataInfo, PostDataInfo } from '@/types/data';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const router = useRouter();

  const boardId = params.id;

  const { userId } = useTestUserStore();
  const { isOpen, usage } = usePostModalStore();

  if (!userId) return router.push('/signin');

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostDataInfo>(
    ['post', boardId],
    () => getPostByBoardId(boardId),
    {
      enabled: !!userId,
    },
  );

  console.log(post);

  if (isError) return <div>error</div>;
  if (isLoading) return <div>isLoading</div>;

  return (
    <main className="mt-[60px] pt-[52px] px-4 flex justify-center items-center">
      <div className="relative w-full max-w-[720px] min-w-[328px] h-[864px] border-gradient rounded-xl">
        <div className="h-full px-5 py-5">
          <Screws />
          <div className="relative h-full pl-7 flex flex-col max-[450px]:pl-2">
            <PageTitle text={post.title} className=" mb-7" />
            <div className="relative w-full flex justify-between items-center mb-4">
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
                ownerId={post.accountId}
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
                commentNum={post.comments?.length || 0}
                isLike={false}
                usage="post"
                className="mb-3"
              />
              <CommentForm boardId={post.boardId} />
              <ul>
                {post.comments?.map((comment: CommentDataInfo) => (
                  <Comment key={comment.commentId} comment={comment} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isOpen &&
        (usage === 'post' ? (
          <PostDeleteModal postId={params.id} />
        ) : (
          <CommentDeleteModal />
        ))}
    </main>
  );
}
