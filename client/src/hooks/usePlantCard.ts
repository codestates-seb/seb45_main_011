import cloneDeep from 'lodash/cloneDeep';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/gardenModalStore';

const usePlantCard = () => {
  const {
    sidebarState,
    point,
    shop,
    inventory,
    plants,
    changeEditMode,
    setInventory,
    setPlants,
    observePurchaseTarget,
    saveReference,
  } = useGardenStore();
  const { changeType, open } = useModalStore();

  const handlePurchase = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLElement) {
      const targetId = event.target.closest('li')?.dataset.shopId;
      const item = shop.find(({ productId }) => productId === Number(targetId));

      if (item) {
        const isPurchasable = point > item.price;
        const purchaseTarget = { ...item, isPurchasable };

        observePurchaseTarget(purchaseTarget);
      }
    }

    changeType('purchaseInfo');
    open();
  };

  const handleInstall = (event: React.MouseEvent<HTMLButtonElement>) => {
    changeEditMode(true);

    saveReference({
      inventory: cloneDeep(inventory),
      plants: cloneDeep(plants),
    });

    if (event.target instanceof HTMLElement) {
      const targetId = event.target.closest('li')?.dataset.plantId;

      const newInventory = inventory.filter(
        ({ plantObjId }) => plantObjId !== Number(targetId),
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    sidebarState === 'shop' ? handlePurchase(event) : handleInstall(event);

  return { handleClick };
};

export default usePlantCard;
