'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { getPostByBoardId } from '@/api/board';

import usePostModalStore from '@/stores/postModalStore';
import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import {
  PageTitle,
  PostCountInfo,
  Screws,
  LoadingNotice,
  ErrorMessage,
  Footer,
} from '@/components/common';
import PostDeleteModal from '@/components/post/PostDeleteModal';
import Comment from '@/components/post/Comment';
import CommentForm from '@/components/post/CommentForm';
import PostContent from '@/components/post/PostContent';
import DateAndControl from '@/components/post/DateAndControlSection';
import PostImage from '@/components/post/PostImage';
import PostProfile from '@/components/post/PostProfile';
import HashTags from '@/components/post/HashTags';
import CommentDeleteModal from '@/components/post/CommentDeleteModal';

import { CommentDataInfo, PostDataInfo } from '@/types/data';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const router = useRouter();

  const boardId = params.id;

  const [comments, setComments] = useState<CommentDataInfo[]>();

  const { userId } = useUserStore();
  const { isOpen, type } = usePostModalStore();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostDataInfo>(['post', boardId], () =>
    getPostByBoardId(boardId),
  );

  const isOwner = userId === String(post?.accountId);

  useEffectOnce(() => {
    window.scrollTo(0, 0);
    return router.refresh();
  });

  useEffect(() => {
    if (post?.comments) setComments(post?.comments);
  }, [post?.comments]);

  return (
    <>
      <motion.main
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center h-auto min-h-full pb-[343px] px-4">
        <div className="relative w-full max-w-[720px] min-w-[328px] h-fit border-gradient rounded-xl shadow-container">
          <div className="h-full px-5 py-5">
            <Screws />
            {isLoading && (
              <div className="w-full min-h-[494px] h-full flex justify-center items-center">
                <LoadingNotice isTransparent={true} />
              </div>
            )}
            {isError && (
              <div className="w-full min-h-[494px] h-full flex justify-center items-center">
                <ErrorMessage />
              </div>
            )}
            {post && (
              <div className="px-4 pt-3 h-full flex flex-col max-[450px]:pl-2">
                <PageTitle
                  text={post.title}
                  className="mb-7 break-words max-[500px]:text-lg"
                />

                <div className="relative w-full flex justify-between items-center mb-4 max-[500px]:items-end">
                  <PostProfile
                    displayName={post.displayName}
                    userId={post.accountId}
                    profileImageUrl={post.profileImageUrl}
                    grade={post.grade}
                    usage="post"
                  />
                  <DateAndControl
                    date={new Date(post.createAt)}
                    usage="post"
                    isOwner={isOwner}
                    ownerId={String(post.accountId)}
                    targetId={String(post.boardId)}
                  />
                </div>
                <div className="pr-6 h-fit max-h-[600px] w-full flex flex-col overflow-y-scroll scrollbar max-[500px]:pr-5 max-[500px]:max-h-[400px]">
                  <div className="px-[1.875rem] py-[1.625rem] w-full bg-brown-10 border-2 border-brown-50 rounded-lg mb-8 common-drop-shadow ">
                    <PostImage src={post.boardImageUrl} />
                    <PostContent content={post.content} />
                    <HashTags hashTags={post.hashTags} />
                  </div>
                  <PostCountInfo
                    liked={post.liked}
                    likesNum={post.likeNum}
                    commentNum={comments?.length || 0}
                    usage="post"
                    boardId={String(post.boardId)}
                    className="mb-3"
                  />
                  {userId && <CommentForm boardId={String(post.boardId)} />}

                  <ul>
                    {comments?.map((comment: CommentDataInfo) => (
                      <Comment
                        key={comment.commentId}
                        comment={comment}
                        boardId={String(post.boardId)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        {isOpen &&
          post &&
          (type === 'post' ? (
            <PostDeleteModal />
          ) : (
            <CommentDeleteModal boardId={String(post?.boardId)} />
          ))}
      </motion.main>
      <Footer />
    </>
  );
}
