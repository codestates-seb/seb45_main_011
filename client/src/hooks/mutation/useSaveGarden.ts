import { useMutation } from '@tanstack/react-query';

import { saveGarden } from '@/api/garden';

import useGardenStore from '@/stores/gardenStore';

import { PlantLocation } from '@/types/data';

interface SaveParameters {
  userId: string;
  plantLocations: PlantLocation[];
}

const useSaveGarden = () => {
  const { setPlants } = useGardenStore();

  const { mutate } = useMutation({
    mutationFn: ({ userId, plantLocations }: SaveParameters) =>
      saveGarden(userId, plantLocations),
    onSuccess: ({ plantObjs }) => setPlants(plantObjs),
  });

  return { mutate };
};

export default useSaveGarden;
