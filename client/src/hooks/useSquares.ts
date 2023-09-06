import { GardenState } from '@/stores/gardenStore';

import { getInstallable } from '@/utils/getInstallable';

const useSquares = (
  event: React.MouseEvent<HTMLDivElement>,
  uninstallableLocations: { x: number; y: number }[],
  gardenStore: GardenState,
) => {
  const { isEditMode, plants, moveTarget, setPlants, unobserve } = gardenStore;

  if (event.target instanceof HTMLDivElement) {
    if (event.target.dataset.installable === 'false') return;
    if (!(isEditMode && moveTarget)) return;

    const x = Number(event.target.dataset.positionX);
    const y = Number(event.target.dataset.positionY);

    if (
      moveTarget.imageSize === 'lg' &&
      !uninstallableLocations.every((position) =>
        getInstallable(x, y, position, 'lg'),
      )
    )
      return;

    const newPlants = plants.map((plant) => {
      if (moveTarget.plantObjId !== plant.plantObjId) return plant;

      return {
        ...plant,
        location: {
          ...plant.location,
          isInstalled: true,
          x,
          y,
        },
      };
    });

    setPlants(newPlants);

    unobserve();
  }
};

export default useSquares;
