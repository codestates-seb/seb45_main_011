'use client';

import useGardenModalStore from '@/stores/gardenModalStore';

import Modal from '@/components/common/Modal';
import ModalPortal from '@/components/common/ModalPortal';
import CommonButton from '@/components/common/CommonButton';

export default function EmptyInventoryModal() {
  const { close } = useGardenModalStore();

  const handleClose = () => close;

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[400px] pt-10 pb-8">
          <div className="flex flex-col items-center gap-3 font-bold">
            <p className="text-[32px] text-brown-70">설치할 식물이 없어요.</p>
            <p className="text-[28px] text-brown-90">상점에서 구매해보세요!</p>
          </div>
          <CommonButton onClose={handleClose} type="button" size="md">
            닫기
          </CommonButton>
        </section>
      </Modal>
    </ModalPortal>
  );
}
