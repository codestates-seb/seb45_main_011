import useGardenStore from '@/stores/gardenStore';
import useUserStore from '@/stores/userStore';

import useSaveGarden from './useSaveGarden';
import usePlants from './usePlants';
import useSquares from './useSquares';
import useMouseTrack from './useMouseTrack';

import { getInitialMapInfo } from '@/utils/getInitialMapInfo';

const useGardenMap = () => {
  const {
    plants,
    moveTarget,
    reference,
    changeEditMode,
    changeSidebarState,
    setInventory,
    setPlants,
    unobserve,
  } = useGardenStore();
  const { userId } = useUserStore();

  const { mutate } = useSaveGarden();

  const { uninstallableLocations, installedPlants } = getInitialMapInfo(plants);

  const { handlePlants } = usePlants();
  const { handleSquares } = useSquares(uninstallableLocations);
  const { targetX, targetY, setMousePosition } = useMouseTrack();

  const handleGarden = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(
        event.target instanceof HTMLImageElement ||
        event.target instanceof HTMLDivElement
      )
    )
      return;

    if (event.target instanceof HTMLImageElement) handlePlants(event);
    if (event.target instanceof HTMLDivElement) handleSquares(event);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!moveTarget) return;

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleSave = () => {
    const plantLocations = plants.map(({ plantObjId, location }) => ({
      plantObjId,
      locationDto: { ...location },
    }));

    if (userId) mutate({ userId, plantLocations });

    changeEditMode(false);
  };

  const handleCancel = () => {
    if (reference) {
      setInventory(reference.inventory);
      setPlants(reference.plants);
    }

    changeSidebarState('inventory');
    changeEditMode(false);

    unobserve();
  };

  return {
    uninstallableLocations,
    installedPlants,
    targetX,
    targetY,
    handleGarden,
    handleMouseMove,
    handleSave,
    handleCancel,
  };
};

export default useGardenMap;
