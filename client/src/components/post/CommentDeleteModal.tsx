'use client';

import usePostStore from '@/stores/postStore';
import useModalStore from '@/stores/modalStore';

import useDeleteCommentMutation from '@/hooks/useDeleteCommentMutation';

import { Modal, ModalPortal, CommonButton } from '@/components/common';

import { COMMENT_DELETE_MODAL_TEXT } from '@/constants/contents';

interface CommentDeleteModalProps {
  boardId: string | null;
}

export default function CommentDeleteModal({
  boardId,
}: CommentDeleteModalProps) {
  const { targetId } = usePostStore();
  const { close } = useModalStore();

  if (!targetId || !boardId) return null;

  const { mutate: deleteComment } = useDeleteCommentMutation({
    targetId,
    boardId,
  });

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
            {COMMENT_DELETE_MODAL_TEXT.firstLine}
            <br />
            <b className="text-red-50">
              {COMMENT_DELETE_MODAL_TEXT.secondLine[0]}
            </b>
            {COMMENT_DELETE_MODAL_TEXT.secondLine[1]}
          </p>
          <div className="flex gap-3">
            <CommonButton
              onDelete={handleDelete}
              type="button"
              size="md"
              className="hover:scale-105 hover:transition-transform">
              삭제
            </CommonButton>
            <CommonButton
              onCancel={handleCancel}
              type="button"
              size="md"
              className="hover:scale-105 hover:transition-transform">
              취소
            </CommonButton>
          </div>
        </section>
      </Modal>
    </ModalPortal>
  );
}
