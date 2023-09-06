'use client';

import useGardenStore, { Reference } from '@/stores/gardenStore';
import useGardenModalStore from '@/stores/gardenModalStore';

import CommonButton from '@/components/common/CommonButton';
import EditModeInfo from './EditModeInfo';
import MapController from './MapController';
import GardenSquares from './GardenSquares';
import InstalledPlants from './InstalledPlants';
import TrackedPlant from './TrackedPlant';

import useMouseTrack from '@/hooks/useMouseTrack';
import usePlants from '@/hooks/usePlants';
import useSquares from '@/hooks/useSquares';

import { getInitialMapInfo } from '@/utils/getInitialMapInfo';

export default function GardenMap() {
  const gardenStore = useGardenStore();
  const {
    isEditMode,
    plants,
    moveTarget,
    reference,
    changeEditMode,
    changeSidebarState,
    setInventory,
    setPlants,
    unobserve,
  } = useGardenStore();
  const gardenModalStore = useGardenModalStore();

  const { targetX, targetY, setMousePosition } = useMouseTrack();

  const { uninstallableLocations, installedPlants } = getInitialMapInfo(plants);

  const handleGarden = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(
        event.target instanceof HTMLImageElement ||
        event.target instanceof HTMLDivElement
      )
    )
      return;

    if (event.target instanceof HTMLImageElement)
      usePlants(event, gardenStore, gardenModalStore);

    if (event.target instanceof HTMLDivElement)
      useSquares(event, uninstallableLocations, gardenStore);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!moveTarget) return;

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleSave = () => {
    // fetch 가능성
    // 바뀐 전체 정보 응답으로!
    setPlants(plants);

    changeEditMode(false);
  };

  const handleCancel = () => {
    setInventory((reference as Reference).inventory);
    setPlants((reference as Reference).plants);

    changeSidebarState('inventory');
    changeEditMode(false);
    unobserve();
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
            <CommonButton onSave={handleSave} type="button" size="sm">
              저장
            </CommonButton>
            <CommonButton onCancel={handleCancel} type="button" size="sm">
              취소
            </CommonButton>
          </div>
        )}
        <MapController className="min-[960px]:hidden bottom-4 left-4 z-30" />
        {isEditMode && (
          <GardenSquares uninstallableLocations={uninstallableLocations} />
        )}
        <InstalledPlants
          isEditMode={isEditMode}
          installedPlants={installedPlants}
        />
        {moveTarget && (
          <TrackedPlant
            targetX={targetX}
            targetY={targetY}
            moveTarget={moveTarget}
          />
        )}
      </div>
    </main>
  );
}
