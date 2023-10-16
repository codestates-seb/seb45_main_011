'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { deletePost } from '@/api/post';

import usePostStore from '@/stores/postStore';
import useModalStore from '@/stores/modalStore';

import { Modal, ModalPortal, CommonButton } from '@/components/common';
import { POST_DELETE_MODAL_TEXT } from '@/constants/contents';

interface DeletePostParameters {
  targetId: string;
}

export default function PostDeleteModal() {
  const router = useRouter();

  const { close } = useModalStore();
  const { targetId } = usePostStore();

  if (!targetId) return;

  const { mutate: deletePostMutate } = useMutation({
    mutationFn: ({ targetId }: DeletePostParameters) => deletePost(targetId),
    onSuccess: () => {
      close();
      router.push('/board');
    },
  });

  const handleDelete = () => deletePostMutate({ targetId });

  const handleCancel = () => close();

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[320px] py-8">
          <p className="flex flex-col items-center text-3xl font-bold text-brown-80">
            {POST_DELETE_MODAL_TEXT.firstLine[0]}
            <span>
              <span className="text-red-50">
                {POST_DELETE_MODAL_TEXT.firstLine[1]}
              </span>
              {POST_DELETE_MODAL_TEXT.firstLine[2]}
            </span>
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
