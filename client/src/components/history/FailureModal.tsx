'use client';

import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal, ModalPortal } from '../common';

export default function FailureModal() {
  const { close } = useModalStore();

  return (
    <ModalPortal>
      <Modal className="min-w-[312px] h-fit flex flex-col justify-center items-center mx-1">
        <section className="flex flex-col items-center gap-6 pt-10 pb-8">
          <div className="flex flex-col items-center gap-3 px-5 text-[22px]">
            <p className="font-bold text-brown-70 text-center break-keep leading-8">
              비밀번호가
            </p>
            <p className="font-bold">
              <b className="text-red-50">일치하지 않습니다.</b>
            </p>
          </div>
        </section>

        <div>
          <CommonButton
            type="button"
            size="md"
            className="py-2 px-4 text-[20px] mb-6"
            onClose={close}>
            닫기
          </CommonButton>
        </div>
      </Modal>
    </ModalPortal>
  );
}
