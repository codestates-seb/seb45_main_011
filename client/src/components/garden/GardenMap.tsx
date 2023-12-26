'use client';

import { motion } from 'framer-motion';

import useGardenStore from '@/stores/gardenStore';

import useGardenMap from '@/hooks/useGardenMap';

import { CommonButton } from '@/components/common';
import {
  EditModeInfo,
  MapController,
  GardenSquares,
  InstalledPlants,
  TrackedPlant,
  GardenInfo,
} from '@/components/garden';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface GardenMapProps {
  isOwner: boolean;
}

export default function GardenMap({ isOwner }: GardenMapProps) {
  const { isEditMode, moveTarget } = useGardenStore();
  const {
    gardenMapRef,
    uninstallableLocations,
    installedPlants,
    targetX,
    targetY,
    isDrag,
    handleGarden,
    handleMouseMove,
    handleSave,
    handleCancel,
    handleDragStart,
    handleDragEnd,
    handleDragMove,
  } = useGardenMap();

  return (
    <motion.div
      variants={MOUNT_ANIMATION_VALUES}
      initial="initial"
      animate="animate"
      className="relative">
      <GardenInfo isOwner={isOwner} />
      <main
        ref={gardenMapRef}
        className="min-w-[296px] border-garden rounded-lg rounded-t-none  bg-scroll shadow-outer/down box-content overflow-auto scrollbar-hidden max-[984px]:max-w-[720px] max-[420px]:h-[320px] max-[480px]:rounded-tr-lg">
        <div
          onClick={handleGarden}
          onMouseDown={handleDragStart}
          onMouseMove={isDrag ? handleDragMove : handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className="relative grid-garden w-[720px] h-[480px] rounded-lg rounded-tl-none bg-[url('/assets/img/bg_garden.png')]">
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
      <MapController
        gardenMap={gardenMapRef.current}
        className="absolute min-[960px]:hidden bottom-5 left-5 z-[5]"
      />
    </motion.div>
  );
}
