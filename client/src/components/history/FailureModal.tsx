'use client';

import useSignModalStore from '@/stores/signModalStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import CommonButton from '../common/CommonButton';

export default function FailureModal() {
  const close = useSignModalStore((state) => state.close);

  return (
    <ModalPortal>
      <Modal className="min-w-[420px] h-[227px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center text-[28px] font-bold text-brown-90">
            비밀번호가
            <span className="text-red-50 mt-3">일치하지 않습니다.</span>
          </div>
        </div>
        <div>
          <CommonButton
            type="button"
            size="md"
            children="닫기"
            className="w-[96px] h-[52px] text-[24px] mt-7"
            onClose={close}
          />
        </div>
      </Modal>
    </ModalPortal>
  );
}
