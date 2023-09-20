'use client';

import useSignModalStore from '@/stores/signModalStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import CommonButton from '../common/CommonButton';

export default function FailureModal() {
  const close = useSignModalStore((state) => state.close);

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[480px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="flex flex-col items-center gap-3 px-5">
            <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8">
              비밀번호가
            </p>
            <p className="font-bold text-[28px]">
              <b className="text-red-50">일치하지 않습니다.</b>
            </p>
          </div>
        </div>
        <div>
          <CommonButton
            type="button"
            size="md"
            className="w-[96px] h-[52px] text-[24px] mb-5"
            onClose={close}>
            닫기
          </CommonButton>
        </div>
      </Modal>
    </ModalPortal>
  );
}
