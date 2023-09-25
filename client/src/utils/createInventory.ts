import { PlantObj } from '@/types/data';

export const createInventory = (plants: PlantObj[]) => {
  const inventory = plants
    .filter(({ location }) => !location.isInstalled)
    .map((plant) => {
      const {
        productId,
        plantObjId,
        productName,
        korName,
        imageUrlTable,
        price,
      } = plant;

      return {
        productId,
        plantObjId,
        name: productName,
        korName,
        imageUrlTable,
        price,
      };
    });

  return inventory;
};
