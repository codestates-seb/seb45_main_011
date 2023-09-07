'use client';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/gardenModalStore';

import useRollback from '@/hooks/useRollback';

export default function EditModebutton() {
  const { inventory, plants } = useGardenStore();
  const { changeType, open } = useModalStore();

  const { handleRollback } = useRollback();

  const handleClick = () => {
    if (plants.length === 0 && inventory.length === 0) {
      changeType('emptyInventory');
      open();

      return;
    }

    handleRollback();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="px-4 py-[10px] text-lg text-brown-70 font-bold border-[8px] border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-5 whitespace-nowrap">
      편집 모드
    </button>
  );
}
