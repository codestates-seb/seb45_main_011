'use client';

import { deleteUser } from '@/api/history';

import useSignModalStore from '@/stores/signModalStore';
import useUserStore from '@/stores/userStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import CommonButton from '../common/CommonButton';

export default function ComfirmModal() {
  const token = useUserStore((state) => state.accessToken);
  const { close, changeState } = useSignModalStore();

  const hanldeDeleteUser = async () => {
    try {
      const response = await deleteUser(token);

      if (response.status === 204) {
        return changeState('SuccessedModal');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[420px] h-[200px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="text-[28px] font-bold text-brown-90">
            정말&nbsp;
            <span className="text-red-50">탈퇴</span>
            하시겠습니까?
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <CommonButton
            type="button"
            size="md"
            children="네"
            className="w-[96px] h-[52px] text-[24px]"
            onCheck={hanldeDeleteUser}
          />
          <CommonButton
            type="button"
            size="md"
            children="아니오"
            className="w-[120px] h-[52px] text-[24px]"
            onClose={close}
          />
        </div>
      </Modal>
    </ModalPortal>
  );
}
