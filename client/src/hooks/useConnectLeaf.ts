import { useMutation } from '@tanstack/react-query';

import { connectLeaf } from '@/api/garden';

import useGardenStore from '@/stores/gardenStore';

import { PlantObj } from '@/types/data';

interface ConnectParameters {
  userId: string;
  plantObjId: number;
  selectedLeafId: string | null;
}

const useConnectLeaf = () => {
  const { plants, setPlants, setSelectedLeafId } = useGardenStore();

  const updateGarden = (newPlant: PlantObj) => {
    const newPlants = plants.map((plant) =>
      plant.plantObjId === newPlant.plantObjId ? newPlant : plant,
    );

    setPlants(newPlants);
    setSelectedLeafId(null);
  };

  const { mutate } = useMutation({
    mutationFn: ({ userId, plantObjId, selectedLeafId }: ConnectParameters) =>
      connectLeaf(userId, plantObjId, selectedLeafId),
    onSuccess: (newPlant) => updateGarden(newPlant),
  });

  return { mutate };
};

export default useConnectLeaf;
