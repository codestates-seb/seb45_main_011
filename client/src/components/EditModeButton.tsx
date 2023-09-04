'use client';

import cloneDeep from 'lodash/cloneDeep';

import useGardenStore, { Cache } from '@/stores/gardenStore';

export default function EditModebutton() {
  const {
    isEditMode,
    inventory,
    plants,
    cache,
    setIsEditMode,
    setSidebarState,
    setInventory,
    setPlants,
    setTargetPlant,
    setCache,
  } = useGardenStore();

  const handleClick = () => {
    if (!isEditMode)
      setCache({
        inventory: cloneDeep(inventory),
        plants: cloneDeep(plants),
      });

    setSidebarState('inventory');

    setInventory(isEditMode ? (cache as Cache).inventory : inventory);
    setPlants(isEditMode ? (cache as Cache).plants : plants);
    setTargetPlant(null);

    setIsEditMode(!isEditMode);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="px-4 py-[10px] text-lg text-brown-70 font-bold border-[8px] border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-5">
      편집 모드
    </button>
  );
}
