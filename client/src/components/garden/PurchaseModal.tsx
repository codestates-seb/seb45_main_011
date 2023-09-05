'use client';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/modalStore';

import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';

export default function PurchaseModal() {
  const {
    point,
    plants,
    purchaseTarget,
    setPoint,
    setInventory,
    setPlants,
    setPurchaseTarget,
  } = useGardenStore();
  const { setIsPurchaseModalOpen } = useModalStore();

  const isPurchasable = purchaseTarget && point > purchaseTarget.price;

  const handleClose = () => {
    // fetch 가능성
    if (purchaseTarget && isPurchasable) {
      const { name, korName, imageUrlTable, price } = purchaseTarget;

      const newPlant = {
        plantObjId: plants.length + 1,
        productName: name,
        korName,
        imageUrlTable,
        price,
        location: {
          locationId: plants.length + 1,
          isInstalled: false,
          x: 0,
          y: 0,
        },
        leafDto: null,
      };
      const newPlants = [...plants, newPlant];
      const newInventory = newPlants
        .filter(({ location }) => !location.isInstalled)
        .map((plant) => {
          const { plantObjId, productName, korName, imageUrlTable, price } =
            plant;

          return {
            id: plantObjId,
            name: productName,
            korName,
            imageUrlTable,
            price,
          };
        });
      const newPoint = point - price;

      setPlants(newPlants);
      setInventory(newInventory);
      setPoint(newPoint);
    }

    setPurchaseTarget(null);
    setIsPurchaseModalOpen(false);
  };

  return (
    <ModalPortal>
      <Modal>
        <section className="flex flex-col gap-8 items-center w-[400px] pt-10 pb-8">
          {purchaseTarget && isPurchasable ? (
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
          <CommonButton handleClose={handleClose} usage="button" size="md">
            닫기
          </CommonButton>
        </section>
      </Modal>
    </ModalPortal>
  );
}
