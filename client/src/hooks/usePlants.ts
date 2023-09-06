import { GardenState } from '@/stores/gardenStore';
import { GardenModalState } from '@/stores/gardenModalStore';

const usePlants = (
  event: React.MouseEvent<HTMLDivElement>,
  gardenStore: GardenState,
  gardenModalStore: GardenModalState,
) => {
  const {
    isEditMode,
    plants,
    moveTarget,
    setPlants,
    observeMoveTarget,
    observeInfoTarget,
  } = gardenStore;
  const { changeType, open } = gardenModalStore;

  if (event.target instanceof HTMLImageElement) {
    if (moveTarget) return;

    const targetId = event.target.dataset.plantId;

    if (!isEditMode) {
      const selectedPlant = plants.find(
        (plant) => Number(targetId) === plant.plantObjId,
      );

      selectedPlant && observeInfoTarget(selectedPlant);

      selectedPlant?.leafDto
        ? changeType('leafExist')
        : changeType('noLeafExist');

      open();
    }

    if (isEditMode) {
      const newPlants = plants.map((plant) => {
        if (Number(targetId) !== plant.plantObjId) return plant;

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

export default usePlants;
