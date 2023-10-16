'use client';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/modalStore';
import useUserStore from '@/stores/userStore';

import usePurchasePlant from '@/hooks/usePurchasePlant';

import { ModalPortal, Modal, CommonButton } from '@/components/common';

export default function PurchaseInfoModal() {
  const { purchaseTarget, unobserve } = useGardenStore();
  const { changeType, close } = useModalStore();
  const { userId } = useUserStore();

  const { mutate: purchaseMutate } = usePurchasePlant();

  const handlePurchase = () => {
    if (userId && purchaseTarget?.isPurchasable)
      purchaseMutate({ userId, productId: purchaseTarget.productId });

    changeType('purchase');
  };

  const handleCancel = () => {
    unobserve();
    close();
  };

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[320px] pt-9 pb-8">
          <p className="flex flex-col items-center text-2xl font-bold text-brown-90">
            <span className="inline-block leading-8">
              <span className="text-[28px] text-brown-70">
                {purchaseTarget?.korName}
              </span>
              을(를)
            </span>
            구매하시겠습니까?
          </p>
          <div className="flex gap-3">
            <CommonButton onPurchase={handlePurchase} type="button" size="md">
              구매
            </CommonButton>
            <CommonButton onCancel={handleCancel} type="button" size="md">
              취소
            </CommonButton>
          </div>
        </section>
      </Modal>
    </ModalPortal>
  );
}
