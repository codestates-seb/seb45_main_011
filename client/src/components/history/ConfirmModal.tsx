'use client';

import useDeleteUserMutation from '@/hooks/mutation/useDeleteUserMutation';

import { CommonButton, Modal, ModalPortal } from '../common';

export default function ConfirmModal() {
  const { mutate: onDeleteUser, close } = useDeleteUserMutation();

  return (
    <ModalPortal>
      <Modal className="min-w-[312px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="px-3 py-9 flex flex-col items-center gap-4">
          <div className="text-[22px] font-bold text-brown-90">
            정말&nbsp;
            <span className="text-red-50">탈퇴</span>
            하시겠습니까?
          </div>

          <div className="flex gap-3">
            <CommonButton
              type="button"
              size="sm"
              className="py-2 px-4 text-[18px]"
              onCheck={() => onDeleteUser()}>
              네
            </CommonButton>

            <CommonButton
              type="button"
              size="sm"
              className="py-2 px-4 text-[18px]"
              onClose={close}>
              아니오
            </CommonButton>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
