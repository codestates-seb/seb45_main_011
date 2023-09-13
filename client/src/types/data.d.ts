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
  displayName: string;
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
  displayName: string;
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

export interface BoardDataInfo {
  title: string;
  imageUrl: string;
  likesNum: number;
  commentsNum: number;
  boardId: number;
}
export interface BoardUserDataInfo {
  userId: number;
  displayName: string;
  profileImageUrl?: string;
  grade: string;
}

export interface PostFormValues {
  title: string;
  diaryContent: string;
  image: FileList;
  hashTag: string;
}

export interface RawPostInfo {
  boardId: number;
  title: string;
  content: string;
  boardImageUrl: string;
  likeNum: number;
  createdAt: string;
  modifiedAt: string;
  accountId: number;
  displayName: string;
  profileImageUrl: string | null;
  hashTags: { hashTagId: number; tag: string }[];
  comments: {
    commentId: number;
    content: string;
    accountId: number;
    displayName: string;
    profileUrl: string | null;
    createdAt: StringMappingType;
    modifiedAt: string;
    commentLikeNum: number;
  }[];
}

export interface HashTagInfo {
  hashTagId: number;
  tag: string;
}

export interface CommentDataInfo {
  commentId: number;
  content: string;
  accountId: number;
  displayName: string;
  profileUrl: string | null;
  createdAt: string;
  modifiedAt: string | null;
  commentLikeNum: number;
}

export interface PostDataInfo {
  boardId: number;
  title: string;
  content: string;
  boardImageUrl: string | null;
  likeNum: number;
  createAt: string;
  modifiedAt: string | null;
  accountId: number;
  displayName: string;
  profileImageUrl: string | null;
  hashTags: HashTagInfo[] | null;
  comments: CommentDataInfo[] | null;
}
