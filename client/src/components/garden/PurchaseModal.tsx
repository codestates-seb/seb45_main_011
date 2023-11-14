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
        <section className="flex flex-col gap-8 items-center w-full min-w-[312px] max-w-[400px] pt-10 pb-8">
          {purchaseTarget?.isPurchasable ? (
            <div className="flex flex-col items-center gap-3 px-8 font-bold max-[772px]:gap-2">
              <p className="text-[32px] text-brown-70 max-[772px]:text-[28px]">
                구매 완료!
              </p>
              <p className="text-[28px] text-brown-90 max-[772px]:text-[22px]">
                보관함을 확인하세요 : )
              </p>
            </div>
          ) : (
            <p className="text-2xl text-brown-80 font-bold">
              포인트가{' '}
              <span className="text-[28px] text-red-50">부족합니다!</span>
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
