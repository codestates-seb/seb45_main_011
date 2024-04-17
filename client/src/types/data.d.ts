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
  boardImageUrl: string;
  likeNum: number;
  commentNum: number;
  boardId: number;
  content: string;
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
  grade: string;
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
  liked: boolean;
  grade: string;
}

export interface BoardRankDataInfo {
  rank: number;
  boardId: number;
  title: string;
  displayName: string;
  likeNum: number;
}

export interface GuestbookDataInfo {
  guestbookId: number;
  content: string;
  displayName: string;
  imageUrl: string | null;
  accountGrade: string;
  createdAt: string;
  modifiedAt: string;
}

export interface ChatInfo {
  senderId: number;
  senderName: string;
  messageId: number;
  message: string;
  createdAt: string;
  modifiedAt: string;
  imageUrl: null;
}

export interface ChatList {
  chatRoomId: number;
  createdAt: string;
  latestMessage: string;
  latestTime: string;
  otherAccountId: number;
  otherAccountName: string;
  roomName: string;
  status: string;
  entry?: string;
}

export interface ReportListsData {
  content: string;
  key: string;
}

export interface NotificationDataInfo {
  id: number;
  type:
    | 'writePost'
    | 'writeDiary'
    | 'reportComment'
    | 'reportPost'
    | 'dailyQuiz'
    | 'signup'
    | 'dailyLogin';
  num: number;
  isShow: boolean;
}
