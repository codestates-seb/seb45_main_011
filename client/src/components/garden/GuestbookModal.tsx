'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal, ModalPortal } from '@/components/common';

import CommentForm from './CommentForm';
import Comment from './Comment';

import { GuestbookDataInfo } from '@/types/data';
import { findGuestbookById } from '@/api/garden';

export default function GuestbookModal() {
  const params = useParams();

  const [guestbook, setGuestbook] = useState<GuestbookDataInfo[]>();

  const { userId } = useUserStore();
  const { close } = useModalStore();

  const { data, isLoading, isError } = useQuery<GuestbookDataInfo[]>(
    ['guestbook', userId],
    () => findGuestbookById(params.id as string),
  );

  useEffect(() => {
    if (data?.length) setGuestbook(data);
  }, [data]);

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-2 items-center w-full min-w-[312px] max-w-[540px] h-[72vh] p-8">
          <CommentForm />
          <ul className="w-full overflow-y-auto overflow-x-hidden scrollbar">
            {guestbook?.map((comment: GuestbookDataInfo) => (
              <Comment
                key={comment.guestbookId}
                comment={comment}
                guestbookId={comment.guestbookId}
              />
            ))}
          </ul>
          <CommonButton
            type="button"
            size="md"
            onClick={close}
            className="mt-4">
            닫기
          </CommonButton>
        </section>
      </Modal>
    </ModalPortal>
  );
}
