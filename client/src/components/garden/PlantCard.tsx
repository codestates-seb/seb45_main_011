'use client';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/gardenModalStore';

import Plant from './Plant';
import CommonButton from '@/components/common/CommonButton';

import { PlantInfo } from '@/types/common';
import { PLANT_SIZES, PLANT_CARD_BUTTON_CONTENTS } from '@/constants/contents';

interface PlantCardProps {
  usage: 'shop' | 'inventory';
  plantInfo: PlantInfo;
}

export default function PlantCard({ usage, plantInfo }: PlantCardProps) {
  const {
    sidebarState,
    shop,
    inventory,
    plants,
    changeEditMode,
    setInventory,
    setPlants,
    changePurchaseTarget,
  } = useGardenStore();
  const { changeType, open } = useModalStore();

  const handlePurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLElement) {
      const targetId = e.target.closest('li')?.dataset.shopId;
      const item =
        shop.find(({ productId }) => productId === Number(targetId)) || null;

      changePurchaseTarget(item);
    }

    changeType('purchaseInfo');
    open();
  };

  const handleInstall = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeEditMode(true);

    if (e.target instanceof HTMLElement) {
      const targetId = e.target.closest('li')?.dataset.plantId;

      const newInventory = inventory.filter(
        ({ productId }) => productId !== Number(targetId),
      );
      const newPlants = plants.map((plant) =>
        plant.plantObjId === Number(targetId)
          ? {
              ...plant,
              location: {
                ...plant.location,
                isInstalled: true,
              },
            }
          : plant,
      );

      setInventory(newInventory);
      setPlants(newPlants);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    sidebarState === 'shop' ? handlePurchase(e) : handleInstall(e);

  const { productId, name, korName, imageUrlTable, price } = plantInfo;

  const plantSize = name.startsWith('building') ? 'lg' : 'sm';

  return (
    <li
      data-shop-id={sidebarState === 'shop' && productId}
      data-plant-id={sidebarState === 'inventory' && productId}
      className={`flex flex-col gap-1 items-center w-[126px] border-2 border-brown-50 rounded-lg bg-repeat bg-[url('/assets/img/bg_paper.png')] font-bold shadow-outer/down ${PLANT_CARD_SIZE[usage]}`}>
      <Plant
        name={korName}
        imageUrl={imageUrlTable.sm}
        className="w-[60px] h-[60px] mt-1 object-none"
      />
      <h3 className="text-base text-brown-90 leading-4">{korName}</h3>
      <p className="text-xs text-brown-70 leading-3">
        {PLANT_SIZES[plantSize]}
      </p>
      {usage === 'shop' && (
        <p
          className={`h-5 pl-6 mt-2 bg-contain bg-left bg-no-repeat bg-[url('/assets/img/point.svg')] text-base text-brown-90 leading-5`}>
          {price}
        </p>
      )}
      <CommonButton
        onClick={handleClick}
        type="button"
        size="sm"
        className="my-[10px]">
        {PLANT_CARD_BUTTON_CONTENTS[usage]}
      </CommonButton>
    </li>
  );
}

const PLANT_CARD_SIZE = {
  shop: 'h-[188px]',
  inventory: 'h-[156px]',
} as const;
