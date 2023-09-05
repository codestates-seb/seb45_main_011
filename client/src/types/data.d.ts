export type PlantObj = {
  plantObjId: number;
  productName: string;
  korName: string;
  imageUrlTable: {
    sm: string;
    lg: string;
  };
  price: number;
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

export type Product = {
  productId: number;
  name: string;
  korName: string;
  imageUrlTable: {
    sm: string;
    lg: string;
  };
  price: number;
};

export interface RawGardenInfo {
  point: number;
  plantObjs: PlantObj[];
  products: Product[];
}
