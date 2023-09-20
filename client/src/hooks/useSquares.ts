import useGardenStore from '@/stores/gardenStore';

import { getInstallable } from '@/utils/getInstallable';

const useSquares = (uninstallableLocations: { x: number; y: number }[]) => {
  const { isEditMode, plants, moveTarget, setPlants, unobserve } =
    useGardenStore();

  const handleSquares = (event: React.MouseEvent<HTMLDivElement>) => {
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

  return { handleSquares };
};

export default useSquares;
