export type PlantObj = {
  plantObjId: number;
  productName: string;
  location: {
    locationId: number;
    isInstalled: boolean;
    x: number;
    y: number;
  };
  leafDto: {
    leafId: number;
    leafName: string;
    imageUrl: string;
    journalCount: number;
  } | null;
};

export interface RawGardenInfo {
  point: number;
  plantObjs: PlantObj[];
  products: {
    name: string;
    korName: string;
    imageUrl: string;
    price: number;
  }[];
}
