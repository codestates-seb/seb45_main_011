'use client';

import CommonButton from './common/CommonButton';
import EditModeInfo from './EditModeInfo';
import MapController from './MapController';
import GardenSquares from './GardenSquares';
import InstalledPlants from './InstalledPlants';
import TrackedPlant from './TrackedPlant';

import useGardenStore, { Cache } from '@/stores/gardenStore';
import useMouseTrack from '@/hooks/useMouseTrack';
import { getInstallable } from '@/utils/getInstallable';
import { getInitialMapInfo } from '@/utils/getInitialMapInfo';

export default function GardenMap() {
  const {
    isEditMode,
    plants,
    targetPlant,
    cache,
    setIsEditMode,
    setSidebarState,
    setInventory,
    setPlants,
    setTargetPlant,
  } = useGardenStore();
  const { targetX, targetY, setMousePosition } = useMouseTrack();

  const { uninstallableLocations, installedPlants } = getInitialMapInfo(plants);

  const handleSave = () => {
    setPlants(plants);

    setIsEditMode(false);
  };

  const handleCancel = () => {
    setSidebarState('inventory');

    setInventory((cache as Cache).inventory);
    setPlants((cache as Cache).plants);
    setTargetPlant(null);

    setIsEditMode(false);
  };

  const handleGarden = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(
        e.target instanceof HTMLImageElement ||
        e.target instanceof HTMLDivElement
      )
    )
      return;

    if (e.target instanceof HTMLImageElement) handlePlants(e);
    if (e.target instanceof HTMLDivElement) handleSquares(e);
  };

  const handlePlants = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLImageElement) {
      if (targetPlant || !isEditMode) return;

      const targetId = e.target.dataset.plantId;
      const newPlants = plants.map((plant) => {
        if (Number(targetId) !== plant.plantObjId) return plant;

        const plantSize =
          plant.leafDto && plant.leafDto.journalCount >= 10 ? 'lg' : 'sm';
        const imageSize = plant.productName.startsWith('building')
          ? 'lg'
          : 'sm';

        setTargetPlant({ ...plant, plantSize, imageSize });

        return {
          ...plant,
          location: { ...plant.location, isInstalled: false },
        };
      });

      setPlants(newPlants);
    }
  };

  const handleSquares = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      if (e.target.dataset.installable === 'false') return;
      if (!(isEditMode && targetPlant)) return;

      const x = Number(e.target.dataset.positionX);
      const y = Number(e.target.dataset.positionY);

      if (
        targetPlant.plantSize === 'lg' &&
        !uninstallableLocations.every((position) =>
          getInstallable(x, y, position, 'lg'),
        )
      )
        return;

      const newPlants = plants.map((plant) => {
        if (targetPlant.plantObjId !== plant.plantObjId) return plant;

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
      setTargetPlant(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!targetPlant) return;

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="min-w-[320px] border-garden rounded-lg rounded-tl-none bg-scroll shadow-outer/down box-content overflow-auto scrollbar-hidden">
      <div
        onClick={handleGarden}
        onMouseMove={handleMouseMove}
        className="relative grid-garden w-[720px] h-[480px] rounded-lg rounded-tl-none bg-[url('/assets/img/bg_garden.png')]">
        {isEditMode && <EditModeInfo />}
        {isEditMode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <CommonButton handleSave={handleSave} usage="button" size="sm">
              저장
            </CommonButton>
            <CommonButton handleCancel={handleCancel} usage="button" size="sm">
              취소
            </CommonButton>
          </div>
        )}
        <MapController className="min-[960px]:hidden bottom-4 left-4 z-50" />
        {isEditMode && (
          <GardenSquares uninstallableLocations={uninstallableLocations} />
        )}
        <InstalledPlants
          isEditMode={isEditMode}
          installedPlants={installedPlants}
        />
        {targetPlant && (
          <TrackedPlant
            targetX={targetX}
            targetY={targetY}
            targetPlant={targetPlant}
          />
        )}
      </div>
    </main>
  );
}
