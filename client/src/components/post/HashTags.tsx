import { HashTagInfo } from '@/types/data';

interface HashTagsProps {
  hashTags: HashTagInfo[] | null;
}

export default function HashTags({ hashTags }: HashTagsProps) {
  if (!hashTags || hashTags.length === 0) return null;
  return (
    <div className="flex flex-nowrap gap-2">
      {hashTags?.map((hashTag) => {
        return (
          <span
            key={hashTag.hashTagId}
            className="italic text-xs text-brown-70 max-[500px]:text-[0.5rem]">{`${hashTag.tag}`}</span>
        );
      })}
    </div>
  );
}
