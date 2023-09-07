'use client';

import useGardenStore from '@/stores/gardenStore';
import useGardenModalStore from '@/stores/gardenModalStore';

import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';

export default function PurchaseModal() {
  const { purchaseTarget, unobserve } = useGardenStore();
  const { close } = useGardenModalStore();

  const handleClose = () => {
    unobserve();
    close();
  };

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[400px] pt-10 pb-8">
          {purchaseTarget?.isPurchasable ? (
            <div className="flex flex-col items-center gap-3 font-bold">
              <p className="text-[32px] text-brown-70">구매 완료!</p>
              <p className="text-[28px] text-brown-90">
                보관함을 확인하세요 : )
              </p>
            </div>
          ) : (
            <p className="text-[28px] font-bold">
              포인트가{' '}
              <span className="text-[32px] text-red-50">부족합니다!</span>
            </p>
          )}
          <CommonButton onClose={handleClose} type="button" size="md">
            닫기
          </CommonButton>
        </section>
      </Modal>
    </ModalPortal>
  );
}
