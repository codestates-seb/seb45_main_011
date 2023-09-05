import { create } from 'zustand';

import { PlantObj } from '@/types/data';
import { PlantInfo } from '@/types/common';

type SidebarState = 'shop' | 'inventory';

export interface MoveTarget extends PlantObj {
  plantSize: 'sm' | 'lg';
  imageSize: 'sm' | 'lg';
}

export type Reference = { inventory: PlantInfo[]; plants: PlantObj[] };

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
  reference: Reference | null;
  changeEditMode: (isEditMode: boolean) => void;
  changeSidebarState: (sidbarState: SidebarState) => void;
  setPoint: (point: number) => void;
  setShop: (shop: PlantInfo[]) => void;
  setInventory: (inventory: PlantInfo[]) => void;
  setPlants: (plants: PlantObj[]) => void;
  changeMoveTarget: (moveTarget: MoveTarget | null) => void;
  changeInfoTarget: (infoTarget: PlantObj | null) => void;
  changePurchaseTarget: (purchaseTarget: PlantInfo | null) => void;
  saveReference: (reference: Reference) => void;
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
  reference: null,
  changeEditMode: (isEditMode) => set(() => ({ isEditMode })),
  changeSidebarState: (sidebarState) => set(() => ({ sidebarState })),
  setPoint: (point) => set(() => ({ point })),
  setShop: (shop) => set(() => ({ shop })),
  setInventory: (inventory) => set(() => ({ inventory })),
  setPlants: (plants) => set(() => ({ plants })),
  changeMoveTarget: (moveTarget) => set(() => ({ moveTarget })),
  changeInfoTarget: (infoTarget) => set(() => ({ infoTarget })),
  changePurchaseTarget: (purchaseTarget) => set(() => ({ purchaseTarget })),
  saveReference: (reference) => set(() => ({ reference })),
}));

export default useGardenStore;
