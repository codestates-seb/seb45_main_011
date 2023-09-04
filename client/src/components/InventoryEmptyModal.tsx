'use client';

import useModalStore from '@/stores/modalStore';

import CommonButton from './common/CommonButton';
import Modal from './common/Modal';
import ModalPortal from './common/ModalPortal';

export default function InventoryEmptyModal() {
  const { setIsInventoryEmptyModalOpen } = useModalStore();

  const handleClose = () => setIsInventoryEmptyModalOpen(false);

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[400px] pt-10 pb-8">
          <div className="flex flex-col items-center gap-3 font-bold">
            <p className="text-[32px] text-brown-70">설치할 식물이 없어요.</p>
            <p className="text-[28px] text-brown-90">상점에서 구매해보세요!</p>
          </div>
          <CommonButton handleClose={handleClose} usage="button" size="md">
            닫기
          </CommonButton>
        </section>
      </Modal>
    </ModalPortal>
  );
}
