import { create } from 'zustand';

import { PlantObj } from '@/types/data';
import { PlantInfo } from '@/types/common';

type SidebarState = 'shop' | 'inventory';

export interface MoveTarget extends PlantObj {
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
  moveTarget: MoveTarget | null;
  infoTarget: PlantObj | null;
  purchaseTarget: PlantInfo | null;
  cache: Cache | null;
  setIsEditMode: (isEditMode: boolean) => void;
  setSidebarState: (sidbarState: SidebarState) => void;
  setPoint: (point: number) => void;
  setShop: (shop: PlantInfo[]) => void;
  setInventory: (inventory: PlantInfo[]) => void;
  setPlants: (plants: PlantObj[]) => void;
  setMoveTarget: (moveTarget: MoveTarget | null) => void;
  setInfoTarget: (infoTarget: PlantObj | null) => void;
  setPurchaseTarget: (purchaseTarget: PlantInfo | null) => void;
  setCache: (cache: Cache) => void;
}

const useGardenStore = create<GardenState>((set) => ({
  isEditMode: false,
  sidebarState: 'shop',
  point: 0,
  shop: [],
  inventory: [],
  plants: [],
  moveTarget: null,
  infoTarget: null,
  purchaseTarget: null,
  cache: null,
  setIsEditMode: (isEditMode) => set(() => ({ isEditMode })),
  setSidebarState: (sidebarState) => set(() => ({ sidebarState })),
  setPoint: (point) => set(() => ({ point })),
  setShop: (shop) => set(() => ({ shop })),
  setInventory: (inventory) => set(() => ({ inventory })),
  setPlants: (plants) => set(() => ({ plants })),
  setMoveTarget: (moveTarget) => set(() => ({ moveTarget })),
  setInfoTarget: (infoTarget) => set(() => ({ infoTarget })),
  setPurchaseTarget: (purchaseTarget) => set(() => ({ purchaseTarget })),
  setCache: (cache) => set(() => ({ cache })),
}));

export default useGardenStore;
