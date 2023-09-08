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
  nickname: string;
  password: string;
  passwordCheck: string;
  code: string;
  onLogin: () => void;
};
