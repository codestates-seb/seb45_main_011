import { useMutation } from '@tanstack/react-query';

import { purchasePlant } from '@/api/garden';

import useGardenStore from '@/stores/gardenStore';

import { PlantObj, Point } from '@/types/data';

import { createInventory } from '@/utils/createInventory';

interface PurchaseParameters {
  userId: string;
  productId: number;
}

const usePurchasePlant = () => {
  const { plants, setPlants, setInventory, setPoint } = useGardenStore();

  const updateGarden = (plantObj: PlantObj, point: Point) => {
    const newPlants = [...plants, plantObj];
    const newInventory = createInventory(newPlants);

    setPlants(newPlants);
    setInventory(newInventory);
    setPoint(point.score);
  };

  const { mutate } = useMutation({
    mutationFn: ({ userId, productId }: PurchaseParameters) =>
      purchasePlant(userId, productId),
    onSuccess: ({ plantObj, point }) => updateGarden(plantObj, point),
  });

  return { mutate };
};

export default usePurchasePlant;
