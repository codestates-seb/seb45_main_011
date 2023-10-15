import { getInstallable } from '@/utils/getInstallable';
import { SQAURE_QUANTITY, GARDEN_MAP_COLUMNS } from '@/constants/values';

export const createSquares = (
  uninstallableLocations: { x: number; y: number }[],
) => {
  const squares = Array.from({ length: SQAURE_QUANTITY }, (_, index) => {
    const x = index % GARDEN_MAP_COLUMNS;
    const y = Math.floor(index / GARDEN_MAP_COLUMNS);
    const installable = uninstallableLocations.every((position) =>
      getInstallable(x, y, position, 'sm'),
    );

    return {
      x,
      y,
      installable,
    };
  });

  return squares;
};
