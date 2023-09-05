'use client';

import uuid from 'react-uuid';
import useGardenStore from '@/stores/gardenStore';

import CommonButton from './common/CommonButton';
import PlantCard from './PlantCard';

export default function GardenSidebar() {
  const { isEditMode, sidebarState, shop, inventory, setSidebarState } =
    useGardenStore();
  const plantList =
    sidebarState === 'inventory' || isEditMode ? inventory : shop;

  const handleShop = () => setSidebarState('shop');
  const handleInventory = () => setSidebarState('inventory');

  const listHeight = isEditMode ? 'h-[456px] mt-3' : 'h-[412px]';
  const listBlank = plantList.length > 2 ? 'px-3 mr-[10px]' : 'px-5';

  return (
    <section className="max-w-[182px] h-[496px] border-gradient rounded-xl shadow-outer/down">
      {!isEditMode && (
        <div className="flex gap-2 w-fit mx-auto my-3">
          <CommonButton
            handleShop={handleShop}
            usage="button"
            size="sm"
            className="whitespace-nowrap">
            상점
          </CommonButton>
          <CommonButton
            handleInventory={handleInventory}
            usage="button"
            size="sm"
            className="whitespace-nowrap">
            보관함
          </CommonButton>
        </div>
      )}
      <ul
        className={`flex flex-col gap-3 w-fit overflow-x-hidden overflow-y-scroll scrollbar ${listHeight} ${listBlank}`}>
        {plantList.map((plant) => (
          <PlantCard key={uuid()} usage={sidebarState} plantInfo={plant} />
        ))}
      </ul>
    </section>
  );
}
