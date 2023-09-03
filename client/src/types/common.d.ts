export interface DefaultProps {
  className?: string;
}

export type LeafType = {
  id: number;
  name: string;
  date: string;
  imgUrl: string;
  diary: DiaryInfo[] | null;
};

export type PlantInfo = {
  name: string;
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
