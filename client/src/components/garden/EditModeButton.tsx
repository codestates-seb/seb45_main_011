'use client';

import cloneDeep from 'lodash/cloneDeep';
import useGardenStore, { Reference } from '@/stores/gardenStore';
import useModalStore from '@/stores/gardenModalStore';

export default function EditModebutton() {
  const {
    isEditMode,
    inventory,
    plants,
    reference,
    changeEditMode,
    changeSidebarState,
    setInventory,
    setPlants,
    changeMoveTarget,
    saveReference,
  } = useGardenStore();
  const { changeType, open } = useModalStore();

  const handleClick = () => {
    if (plants.length === 0 && inventory.length === 0) {
      changeType('emptyInventory');
      open();

      return;
    }

    // 취소하는 행위와 동일하다는 명칭으로 만들기
    // 함수로 분리 rollback
    if (!isEditMode)
      // 명칭이 너무 범용적, 기획자가 단어를 봐도 이해할 수 있도록
      // setReference
      saveReference({
        inventory: cloneDeep(inventory),
        plants: cloneDeep(plants),
      });

    changeSidebarState('inventory');

    setInventory(isEditMode ? (reference as Reference).inventory : inventory);
    setPlants(isEditMode ? (reference as Reference).plants : plants);

    changeMoveTarget(null);
    changeEditMode(!isEditMode);
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
