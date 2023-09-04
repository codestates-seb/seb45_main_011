export interface DefaultProps {
  className?: string;
}

export type addPrefixToHandler<T, P extends string> = {
  [K in keyof T as K extends string
    ? `${P}${K}`
    : never]: React.MouseEventHandler<HTMLButtonElement>;
};

export type LeafType = {
  id: number;
  name: string;
  date: string;
  imgUrl: string;
  diary: DiaryInfo[] | null;
};

export type PlantInfo = {
  name: string;
  korName: string;
  imageUrl: string;
  price: number;
};

export interface DiaryInfo {
  id: number;
  date: string;
  imgUrl: string;
  title: string;
  content: string;
}
type InputValues = {
  plantName: string;
  title: string;
  nickname: string;
  password: string;
  newPassword: string;
  newPasswordCheck: string;
  leafContent: string;
  diaryContent: string;
  hashTag: string;
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
};

export type cookieOption = {
  domain: string;
  path: string;
  expires?: Date;
  secure?: boolean;
  httpOnly: boolean;
  samSite?: string;
};
