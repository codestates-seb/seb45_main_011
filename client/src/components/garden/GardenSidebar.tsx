'use client';

import uuid from 'react-uuid';
import { twMerge } from 'tailwind-merge';

import useGardenStore from '@/stores/gardenStore';

import CommonButton from '@/components/common/CommonButton';
import PlantCard from './PlantCard';

export default function GardenSidebar() {
  const { isEditMode, sidebarState, shop, inventory, changeSidebarState } =
    useGardenStore();

  const handleShop = () => changeSidebarState('shop');

  const handleInventory = () => changeSidebarState('inventory');

  const plantList =
    sidebarState === 'inventory' || isEditMode ? inventory : shop;

  const listHeight = isEditMode ? 'h-[456px] mt-3' : 'h-[412px]';
  const listBlank = plantList.length > 2 ? 'px-3 mr-[10px]' : 'px-5';

  return (
    <section className="w-[182px] h-[496px] ml-4 border-gradient rounded-xl shadow-outer/down max-[984px]:w-full max-[984px]:min-w-[312px] max-[984px]:max-w-[736px] max-[984px]:h-[296px] max-[984px]:ml-0 max-[984px]:mt-4">
      {!isEditMode && (
        <div className="flex gap-2 w-fit mx-auto my-3 max-[984px]:ml-4">
          <CommonButton
            onShop={handleShop}
            type="button"
            size="sm"
            className="whitespace-nowrap">
            상점
          </CommonButton>
          <CommonButton
            onInventory={handleInventory}
            type="button"
            size="sm"
            className="whitespace-nowrap">
            보관함
          </CommonButton>
        </div>
      )}
      <ul
        className={twMerge(
          `flex flex-col gap-3 w-fit overflow-x-hidden overflow-y-scroll scrollbar ${listHeight} ${listBlank} max-[984px]:flex-row max-[984px]:w-auto max-[984px]:h-[212px] max-[984px]:px-0 max-[984px]:mx-4 max-[984px]:overflow-x-scroll max-[984px]:overflow-y-hidden`,
        )}>
        {plantList.map((plant) => (
          <PlantCard key={uuid()} usage={sidebarState} plantInfo={plant} />
        ))}
      </ul>
    </section>
  );
}
