import { PlantObj } from '@/types/data';

import { blockedLocations } from '@/constants/values';

const getInstalledPlants = (plants: PlantObj[]) =>
  plants.filter(({ location }) => location.isInstalled);

const getUninstallableLocations = (installedPlants: PlantObj[]) =>
  installedPlants.reduce(
    (plants, { productName, location }) => {
      if (productName.startsWith('building')) {
        return [
          ...plants,
          { x: location.x + 1, y: location.y },
          { x: location.x, y: location.y + 1 },
          { x: location.x + 1, y: location.y + 1 },
          { x: location.x, y: location.y },
        ];
      }

      return [...plants, { x: location.x, y: location.y }];
    },
    [...blockedLocations],
  );

export const getInitialMapInfo = (plants: PlantObj[]) => {
  const installedPlants = getInstalledPlants(plants);
  const uninstallableLocations = getUninstallableLocations(installedPlants);

  return { installedPlants, uninstallableLocations };
};
