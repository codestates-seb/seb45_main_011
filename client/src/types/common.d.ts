export interface DefaultProps {
  className?: string;
}

export type addPrefixToHandler<T, P extends string> = {
  [K in keyof T as K extends string
    ? `${P}${K}`
    : never]: React.MouseEventHandler<HTMLButtonElement>;
};

export type PlantInfo = {
  productId: number;
  plantObjId?: number;
  name: string;
  korName: string;
  imageUrlTable: {
    sm: string;
    lg: string;
  };
  price: number;
  isPurchasable?: boolean;
};

export type InputValues = {
  plantName: string;
  title: string;
  nickname: string;
  password: string;
  newPassword: string;
  newPasswordCheck: string;
  leafContent: string;
  diaryContent: string;
  hashTag: string;
  image: FileList;
  fieldState: string;
  isBoard: boolean;
};

export type SignFormValue = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  code: string;
  onLogin: () => void;
};

export type SignupFormValue = {
  email: string;
  password: string;
  nickname: string;
};

export type SigninFormValue = {
  email: string;
  password: string;
};

export type UserData = {
  accountId: number;
  displayName: string;
  email: string;
  grade: string;
  point: number;
  profileImageUrl: string | null;
};

export type SearchValues = {
  search: string;
};

export type CommentInputValue = {
  comment: string;
};

export interface HistoryBoradProps {
  paramsId: string;
}

export enum PageType {
  Main,
  Signup,
  Signin,
  Garden,
  Board,
  Leaf,
  Leafs,
  History,
}

export type ContextType = {
  garden?: string;
  leaf?: string;
  leafId?: string;
  leafs?: string;
  history?: string;
  slug?: string;
};

export type Post = {
  slug: string;
  title: string;
};
