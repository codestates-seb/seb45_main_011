'use client';

import { deleteUser } from '@/api/history';

import useSignModalStore from '@/stores/signModalStore';
import useUserStore from '@/stores/userStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import CommonButton from '../common/CommonButton';

export default function ConfirmModal() {
  const { close, changeState } = useSignModalStore();

  const hanldeDeleteUser = async () => {
    const response = await deleteUser();

    if (response === 204) {
      return changeState('SuccessedModal');
    }
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[312px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="px-3 py-9 flex flex-col items-center gap-4">
          <div className="text-[22px]  font-bold text-brown-90">
            정말&nbsp;
            <span className="text-red-50">탈퇴</span>
            하시겠습니까?
          </div>
          <div className="flex gap-3">
            <CommonButton
              type="button"
              size="sm"
              className="py-2 px-4 text-[18px]"
              onCheck={hanldeDeleteUser}>
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
