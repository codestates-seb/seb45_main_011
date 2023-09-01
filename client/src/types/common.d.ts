export interface DefaultProps {
  className?: string;
}

export type LeafType = {
  id: number;
  name: string;
  date: string;
  imgUrl: string;
  journal?: JournalType[] | null;
};

export type JournalType = {
  date: string;
  imgUrl?: string;
  content: string;
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
