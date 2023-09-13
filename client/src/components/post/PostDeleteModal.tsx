'use client';

import { useMutation } from '@tanstack/react-query';

import { deletePost } from '@/api/post';

import usePostModalStore from '@/stores/postModalStore';

import Modal from '@/components/common/Modal';
import ModalPortal from '@/components/common/ModalPortal';
import CommonButton from '@/components/common/CommonButton';
import usePostStore from '@/stores/postStore';

interface DeletePostParameters {
  targetId: number;
}

export default function PostDeleteModal() {
  const { close } = usePostModalStore();
  const { targetId } = usePostStore();

  if (!targetId) return;

  const { mutate } = useMutation({
    mutationFn: ({ targetId }: DeletePostParameters) => deletePost(targetId),
    onSuccess: () => close(),
  });

  const handleDelete = () => mutate({ targetId });

  const handleCancel = () => close();

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[320px] py-8">
          <p className="flex flex-col items-center text-3xl font-bold text-brown-80">
            게시글을
            <span>
              <span className="text-red-50">삭제</span>하시겠습니까?
            </span>
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
