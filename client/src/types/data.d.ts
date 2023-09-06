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

export interface RawGardenInfo {
  point: number;
  plantObjs: PlantObj[];
  products: {
    name: string;
    korName: string;
    imageUrlTable: {
      sm: string;
      lg: string;
    };
    price: number;
  }[];
}

export interface LeafsDataInfo {
  leafId: number;
  leafName: string;
  createAt: string;
  imageUrl: string;
}

export interface DiaryDataInfo {
  diaryId: number;
  createdAt: string;
  modifiedAt?: string;
  imageUrl?: string;
  content: string;
  title: string;
}

export interface LeafDataInfo {
  leafId?: number;
  leafName?: string;
  imageUrl?: string;
  content?: string;
  createdAt?: string;
  diary?: DiaryDataInfo[] | null;
}
