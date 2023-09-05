'use client';

import useGardenStore, { Reference } from '@/stores/gardenStore';
import useModalStore from '@/stores/gardenModalStore';

import CommonButton from '@/components/common/CommonButton';
import EditModeInfo from './EditModeInfo';
import MapController from './MapController';
import GardenSquares from './GardenSquares';
import InstalledPlants from './InstalledPlants';
import TrackedPlant from './TrackedPlant';

import useMouseTrack from '@/hooks/useMouseTrack';
import { getInstallable } from '@/utils/getInstallable';
import { getInitialMapInfo } from '@/utils/getInitialMapInfo';

export default function GardenMap() {
  // 데이터를 줄이기 위해 노력해보기
  // open.. close... toggle... 이렇게 한 단어로 줄일 수 있으면 좋음
  const {
    isEditMode,
    plants,
    moveTarget,
    reference,
    changeEditMode,
    changeSidebarState,
    setInventory,
    setPlants,
    observeMoveTarget,
    observeInfoTarget,
    unobserve,
  } = useGardenStore();
  const { changeType, open } = useModalStore();

  const { targetX, targetY, setMousePosition } = useMouseTrack();

  const { uninstallableLocations, installedPlants } = getInitialMapInfo(plants);

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

  // plants, squares 는 몰라도 됨
  // hook으로 분리해보기
  const handlePlants = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLImageElement) {
      if (moveTarget) return;

      const targetId = e.target.dataset.plantId;

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

  const handleSquares = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      if (e.target.dataset.installable === 'false') return;
      if (!(isEditMode && moveTarget)) return;

      const x = Number(e.target.dataset.positionX);
      const y = Number(e.target.dataset.positionY);

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
