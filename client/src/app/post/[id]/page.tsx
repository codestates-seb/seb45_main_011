'use client';

import usePostModalStore from '@/stores/postModalStore';

import PostDeleteModal from '@/components/post/PostDeleteModal';

interface PostProps {
  params: { id: string };
}

export default function Post({ params }: PostProps) {
  const { isOpen } = usePostModalStore();

  return (
    <div>
      게시글 상세 페이지입니다!
      {isOpen && <PostDeleteModal postId={params.id} />}
    </div>
  );
}
