import { create } from 'zustand';

import { PlantObj } from '@/types/data';
import { PlantInfo } from '@/types/common';

type SidebarState = 'shop' | 'inventory';

export interface TargetPlant extends PlantObj {
  plantSize: 'sm' | 'lg';
  imageSize: 'sm' | 'lg';
}

export type Cache = { inventory: PlantInfo[]; plants: PlantObj[] };

interface GardenState {
  isEditMode: boolean;
  sidebarState: SidebarState;
  point: number;
  shop: [] | PlantInfo[];
  inventory: [] | PlantInfo[];
  plants: [] | PlantObj[];
  targetPlant: TargetPlant | null;
  cache: Cache | null;
  setIsEditMode: (isEditMode: boolean) => void;
  setSidebarState: (sidbarState: SidebarState) => void;
  setPoint: (point: number) => void;
  setShop: (shop: PlantInfo[]) => void;
  setInventory: (inventory: PlantInfo[]) => void;
  putInInventory: (plant: PlantInfo) => void;
  setPlants: (plants: PlantObj[]) => void;
  setTargetPlant: (targetPlant: TargetPlant | null) => void;
  setCache: (cache: Cache) => void;
}

const useGardenStore = create<GardenState>((set, get) => ({
  isEditMode: false,
  sidebarState: 'shop',
  point: 0,
  shop: [],
  inventory: [],
  targetPlant: null,
  plants: [],
  cache: null,
  setIsEditMode: (isEditMode) => set(() => ({ isEditMode })),
  setSidebarState: (sidebarState) => set(() => ({ sidebarState })),
  setPoint: (point) => set(() => ({ point })),
  setShop: (shop) => set(() => ({ shop })),
  setInventory: (inventory) => set(() => ({ inventory })),
  putInInventory: (plant) =>
    set((state) => ({ inventory: [...state.inventory, plant] })),
  setPlants: (plants) => set(() => ({ plants })),
  setTargetPlant: (targetPlant) => set(() => ({ targetPlant })),
  setCache: (cache) => set(() => ({ cache })),
}));

export default useGardenStore;
