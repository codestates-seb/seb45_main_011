import { create } from 'zustand';

import { PlantObj } from '@/types/data';
import { PlantInfo } from '@/types/common';

export type SidebarState = 'shop' | 'inventory';

export interface MoveTarget extends PlantObj {
  plantSize: 'sm' | 'lg';
  imageSize: 'sm' | 'lg';
}

export type Reference = { inventory: PlantInfo[]; plants: PlantObj[] };

export interface GardenState {
  isEditMode: boolean;
  sidebarState: SidebarState;

  point: number;
  shop: PlantInfo[] | [];
  inventory: PlantInfo[] | [];
  plants: PlantObj[] | [];
  selectedLeafId: number | null;

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
  setSelectedLeafId: (selectedLeafId: number | null) => void;

  observeMoveTarget: (moveTarget: MoveTarget | null) => void;
  observeInfoTarget: (infoTarget: PlantObj | null) => void;
  observePurchaseTarget: (purchaseTarget: PlantInfo | null) => void;
  unobserve: () => void;

  saveReference: (reference: Reference) => void;
}

const useGardenStore = create<GardenState>((set) => ({
  isEditMode: false,
  sidebarState: 'shop',

  point: 0,
  shop: [],
  inventory: [],
  plants: [],
  selectedLeafId: null,

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
  setSelectedLeafId: (selectedLeafId) => set(() => ({ selectedLeafId })),

  observeMoveTarget: (moveTarget) => set(() => ({ moveTarget })),
  observeInfoTarget: (infoTarget) => set(() => ({ infoTarget })),
  observePurchaseTarget: (purchaseTarget) => set(() => ({ purchaseTarget })),
  unobserve: () =>
    set(() => ({ moveTarget: null, infoTarget: null, purchaseTarget: null })),

  saveReference: (reference) => set(() => ({ reference })),
}));

export default useGardenStore;
