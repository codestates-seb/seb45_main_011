import { HashTagInfo } from '@/types/data';

interface HashTagsProps {
  hashTags: HashTagInfo[] | null;
}

export default function HashTags({ hashTags }: HashTagsProps) {
  if (!hashTags || hashTags.length === 0) return null;
  return (
    <div className="flex flex-nowrap gap-2 font-bold text-sm text-brown-70 italic">
      {hashTags?.map((hashTag) => {
        return (
          <span
            key={hashTag.hashTagId}
            className="max-[500px]:text-[0.5rem]">{`${hashTag.tag}`}</span>
        );
      })}
    </div>
  );
}
