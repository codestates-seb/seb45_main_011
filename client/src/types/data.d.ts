export type Point = { score: number };

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

export type PlantObj = {
  productId: number;
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
    id: number;
    name: string;
    imageUrl: string;
    journalCount: number;
  } | null;
};

export interface RawGardenInfo {
  point: Point;
  plantObjs: PlantObj[];
  products: Product[];
}

export interface PurchaseInfo {
  point: Point;
  plantObj: PlantObj;
}

export interface PlantLocation {
  plantObjId: number;
  locationDto: {
    locationId: number;
    isInstalled: boolean;
    x: number;
    y: number;
  };
}

export interface LeafsDataInfo {
  leafId: number;
  leafName: string;
  createAt: string;
  leafImageUrl: string;
}

export interface DiaryDataInfo {
  journalId: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface LeafDataInfo {
  leafId: number;
  leafName: string;
  leafImageUrl: string;
  content: string;
  createdAt: string;
}

export interface PostFormValues {
  title: string;
  diaryContent: string;
  image: FileList;
  hashTag: string;
}

export interface RawPostInfo {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  modifiedAt: string;
  leaves: { leafId: number; title: string; imageUrl: string }[];
  likes: { accountId: number }[];
  hashTag: { tag: string }[];
  board_account: { accountId: number; displayName: string; imageUrl: string }[];
  comments: {
    commentId: number;
    content: string;
    createdAt: StringMappingType;
    modifiedAt: string;
    comment_account: {
      accountId: number;
      displayName: string;
      imageUrl: string;
    }[];
  }[];
}
