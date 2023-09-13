'use client';

import usePostStore from '@/stores/postStore';
import usePostModalStore from '@/stores/postModalStore';

import useDeleteCommentMutation from '@/hooks/useDeleteCommentMutation';

import Modal from '@/components/common/Modal';
import ModalPortal from '@/components/common/ModalPortal';
import CommonButton from '@/components/common/CommonButton';

interface CommentDeleteModalProps {
  boardId: number | null;
}

export default function CommentDeleteModal({
  boardId,
}: CommentDeleteModalProps) {
  const { targetId } = usePostStore();
  const { close } = usePostModalStore();

  if (!targetId || !boardId) return null;

  const { mutate: deleteComment } = useDeleteCommentMutation({
    targetId,
    boardId,
  });

  // brwon-40 border
  const handleDelete = () => {
    deleteComment();
    close();
  };

  const handleCancel = () => close();

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[320px] py-8">
          <p className="text-center text-3xl font-bold text-brown-80">
            댓글을
            <br />
            <b className="text-red-50">삭제</b>하시겠습니까?
          </p>
          <div className="flex gap-3">
            <CommonButton onDelete={handleDelete} type="button" size="md">
              삭제
            </CommonButton>
            <CommonButton onCancel={handleCancel} type="button" size="md">
              취소
            </CommonButton>
          </div>
        </section>
      </Modal>
    </ModalPortal>
  );
}
