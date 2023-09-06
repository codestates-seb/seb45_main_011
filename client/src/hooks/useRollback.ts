import cloneDeep from 'lodash/cloneDeep';

import { GardenState, Reference } from '@/stores/gardenStore';

const useRollback = (gardenStore: GardenState) => {
  const {
    isEditMode,
    inventory,
    plants,
    reference,
    changeEditMode,
    changeSidebarState,
    setInventory,
    setPlants,
    unobserve,
    saveReference,
  } = gardenStore;

  if (!isEditMode)
    saveReference({
      inventory: cloneDeep(inventory),
      plants: cloneDeep(plants),
    });

  changeSidebarState('inventory');

  setInventory(isEditMode ? (reference as Reference).inventory : inventory);
  setPlants(isEditMode ? (reference as Reference).plants : plants);

  changeEditMode(!isEditMode);
  unobserve();
};

export default useRollback;
