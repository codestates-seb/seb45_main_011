import { blockedLocations } from '@/constants/values';
import { ProcessedPlant } from '@/stores/gardenStore';

export const getInitialMapInfo = (plants: ProcessedPlant[]) => {
  let uninstallableLocations = [...blockedLocations];

  const installedPlants = plants.filter(({ location }) => location.isInstalled);

  installedPlants.forEach(({ productName, location }) => {
    if (productName.startsWith('building'))
      uninstallableLocations = [
        ...uninstallableLocations,
        { x: location.x + 1, y: location.y },
        { x: location.x, y: location.y + 1 },
        { x: location.x + 1, y: location.y + 1 },
      ];

    uninstallableLocations = [
      ...uninstallableLocations,
      { x: location.x, y: location.y },
    ];
  });

  return { uninstallableLocations, installedPlants };
};
