'use client';

import useGardenStore from '@/stores/gardenStore';

import useGardenMap from '@/hooks/useGardenMap';

import CommonButton from '@/components/common/CommonButton';
import {
  EditModeInfo,
  MapController,
  GardenSquares,
  InstalledPlants,
  TrackedPlant,
  GardenInfo,
} from '@/components/garden';

interface GardenMapProps {
  isMyself: boolean;
}

export default function GardenMap({ isMyself }: GardenMapProps) {
  const { isEditMode, moveTarget } = useGardenStore();
  const {
    uninstallableLocations,
    installedPlants,
    targetX,
    targetY,
    handleGarden,
    handleMouseMove,
    handleSave,
    handleCancel,
  } = useGardenMap();

  return (
    <div>
      <GardenInfo isMyself={isMyself} />
      <main className="min-w-[296px] border-garden rounded-lg rounded-tl-none bg-scroll shadow-outer/down box-content overflow-auto scrollbar-hidden max-[984px]:max-w-[720px]">
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
    </div>
  );
}
