'use client';

import { useState } from 'react';

import CommonButton from './common/CommonButton';
import { PlantInfo } from '@/types/common';
import PlantCard from './PlantCard';

interface GardenSidebarProps {
  isEditMode: boolean;
  plantsInfo: PlantInfo[];
}

export default function GardenSidebar({
  isEditMode,
  plantsInfo,
}: GardenSidebarProps) {
  const [sidebarState, setSidebarState] = useState<'shop' | 'inventory'>(
    'shop',
  );

  const handleShop = () => setSidebarState('shop');

  const handleInventory = () => setSidebarState('inventory');

  const listStyle = isEditMode ? 'h-[440px] mt-3' : 'h-[396px]';

  return (
    <section className="w-[182px] h-[480px] border-gradient rounded-xl shadow-outer/down">
      {!isEditMode && (
        <div className="flex gap-2 w-fit mx-auto my-3">
          <CommonButton usage="button" size="sm" handleShop={handleShop}>
            상점
          </CommonButton>
          <CommonButton
            usage="button"
            size="sm"
            handleInventory={handleInventory}>
            보관함
          </CommonButton>
        </div>
      )}
      <ul
        className={`flex flex-col gap-3 px-3 mr-[10px] overflow-x-hidden overflow-y-scroll scrollbar ${listStyle}`}>
        {plantsInfo.map((plantInfo) => (
          <PlantCard usage={sidebarState} plantInfo={plantInfo} />
        ))}
      </ul>
    </section>
  );
}
