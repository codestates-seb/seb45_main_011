import { useRouter, useParams } from 'next/navigation';

import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/modalStore';
import useUserStore from '@/stores/userStore';

const usePlants = () => {
  const router = useRouter();
  const { id } = useParams();

  const {
    isEditMode,
    plants,
    moveTarget,
    setPlants,
    observeMoveTarget,
    observeInfoTarget,
  } = useGardenStore();
  const { changeType, open } = useModalStore();
  const { userId } = useUserStore();

  const handlePlants = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLImageElement) {
      if (moveTarget) return;

      const targetId = event.target.dataset.plantId;

      if (!isEditMode) {
        const selectedPlant = plants.find(
          (plant) => Number(targetId) === plant.plantObjId,
        );

        if (userId === id) {
          selectedPlant && observeInfoTarget(selectedPlant);

          selectedPlant?.leafDto
            ? changeType('leafExist')
            : changeType('noLeafExist');

          open();
        }

        if (userId !== id) {
          const leafId = selectedPlant?.leafDto?.id;

          leafId && router.push(`/leaf/${id}/${leafId}`);
        }
      }

      if (isEditMode) {
        const newPlants = plants.map((plant) => {
          if (plant.plantObjId !== Number(targetId)) return plant;

          const plantSize =
            plant.leafDto && plant.leafDto.journalCount >= 10 ? 'lg' : 'sm';
          const imageSize = plant.productName.startsWith('building')
            ? 'lg'
            : 'sm';

          observeMoveTarget({ ...plant, plantSize, imageSize });

          return {
            ...plant,
            location: { ...plant.location, isInstalled: false },
          };
        });

        setPlants(newPlants);
      }
    }
  };

  return { handlePlants };
};

export default usePlants;
