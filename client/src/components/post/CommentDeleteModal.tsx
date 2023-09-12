'use client';

import Modal from '@/components/common/Modal';
import ModalPortal from '@/components/common/ModalPortal';
import CommonButton from '@/components/common/CommonButton';
import usePostStore from '@/stores/postStore';
import usePostModalStore from '@/stores/postModalStore';

interface CommentDeleteModalProps {}

export default function CommentDeleteModal() {
  const { targetId } = usePostStore();
  const { close } = usePostModalStore();

  const handleDelete = () => {};
  const handleCancel = () => close();

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[320px] py-8">
          <p className="flex flex-col items-center text-3xl font-bold text-brown-80">
            댓글을
            <div>
              <span className="text-red-50">삭제</span>하시겠습니까?
            </div>
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
