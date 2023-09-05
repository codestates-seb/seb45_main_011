export interface DefaultProps {
  className?: string;
}

export type addPrefixToHandler<T, P extends string> = {
  [K in keyof T as K extends string
    ? `${P}${K}`
    : never]: React.MouseEventHandler<HTMLButtonElement>;
};

export type LeafDataInfo = {
  leafId: number;
  leafNickname: string;
  start: string;
  content: string;
  imageUrl: string;
  diary?: DiaryInfo[] | null;
};

export type PlantInfo = {
  productId: number;
  name: string;
  korName: string;
  imageUrlTable: {
    sm: string;
    lg: string;
  };
  price: number;
};

export interface DiaryInfo {
  id: number;
  date: string;
  imgUrl: string;
  title: string;
  content: string;
}

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
};

export type SigninFormValue = {
  email?: string;
  password?: string;
};

export type SignupFormValue = {
  email: string;
  nickname: string;
  password: string;
  password_check: string;
  code?: string;
};

export type cookieOption = {
  domain: string;
  path: string;
  expires?: Date;
  secure?: boolean;
  httpOnly: boolean;
  samSite?: string;
};
