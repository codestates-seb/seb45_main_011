'use client';

import { useRef } from 'react';

import uuid from 'react-uuid';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import useGardenStore from '@/stores/gardenStore';

import usePlantCard from '@/hooks/usePlantCard';
import useMouseDrag from '@/hooks/useMouseDrag';

import { CommonButton } from '@/components/common';
import PlantCard from './PlantCard';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function GardenSidebar() {
  const sidebarRef = useRef<HTMLUListElement>(null);

  const { isEditMode, sidebarState, shop, inventory, changeSidebarState } =
    useGardenStore();

  const { handleClick } = usePlantCard();
  const { isDrag, handleDragStart, handleDragEnd, handleDragMove } =
    useMouseDrag(sidebarRef);

  const handleShop = () => changeSidebarState('shop');

  const handleInventory = () => changeSidebarState('inventory');

  const plantList =
    sidebarState === 'inventory' || isEditMode ? inventory : shop;

  const listHeight = isEditMode ? 'h-[456px] mt-3' : 'h-[412px]';
  const listBlank = plantList.length > 2 ? 'px-3 mr-[10px]' : 'px-5';

  return (
    <motion.section
      variants={MOUNT_ANIMATION_VALUES}
      initial="initial"
      animate="animate"
      className="w-[182px] h-[496px] ml-4 border-gradient rounded-xl shadow-outer/down max-[984px]:w-full max-[984px]:min-w-[312px] max-[984px]:max-w-[736px] max-[984px]:h-[296px] max-[984px]:ml-0 max-[984px]:mt-4">
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
        ref={sidebarRef}
        onClick={handleClick}
        onMouseDown={handleDragStart}
        onMouseMove={isDrag ? handleDragMove : undefined}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className={twMerge(
          `flex flex-col gap-3 w-fit pt-[6px] overflow-x-hidden overflow-y-scroll scrollbar ${listHeight} ${listBlank} max-[984px]:flex-row max-[984px]:w-auto max-[984px]:h-[216px] max-[984px]:px-1 max-[984px]:mx-4 max-[984px]:overflow-x-scroll max-[984px]:overflow-y-hidden`,
        )}>
        {plantList.map((plant) => (
          <PlantCard key={uuid()} usage={sidebarState} plantInfo={plant} />
        ))}
      </ul>
    </motion.section>
  );
}
