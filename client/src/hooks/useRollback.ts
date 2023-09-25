import cloneDeep from 'lodash/cloneDeep';

import useGardenStore from '@/stores/gardenStore';

const useRollback = () => {
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
  } = useGardenStore();

  const handleRollback = () => {
    if (!isEditMode)
      saveReference({
        inventory: cloneDeep(inventory),
        plants: cloneDeep(plants),
      });

    if (reference) {
      setInventory(isEditMode ? reference.inventory : inventory);
      setPlants(isEditMode ? reference.plants : plants);
    }

    changeSidebarState('inventory');
    changeEditMode(!isEditMode);

    unobserve();
  };

  return { handleRollback };
};

export default useRollback;
