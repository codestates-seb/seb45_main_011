import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useLeafStore from '@/stores/leafStore';
import useModalStore from '@/stores/modalStore';

import { PageTitle, CommonButton } from '@/components/common';
import { LEAF_INFO_TEXT } from '@/constants/contents';

interface LeafInfoProps {
  pathUserId: string;
  leafName: string;
  imageUrl: string;
  content: string;
}

export default function LeafInfo({
  leafName,
  imageUrl,
  content,
  pathUserId,
}: LeafInfoProps) {
  const router = useRouter();

  const { isOwner } = useLeafStore();
  const { open, changeType } = useModalStore();

  const navigateToGarden = () => router.push(`/garden/${pathUserId}`);

  const AddDiary = () => {
    changeType('add');
    open();
  };
  return (
    <div className="flex flex-col items-center">
      <PageTitle className="mb-5" text={leafName} />
      <div className="w-[232px] h-[180px] mb-2 bg-brown-20 border-2 border-brown-50 rounded-lg overflow-hidden shadow-outer/down">
        <Image
          src={imageUrl}
          alt={leafName || ''}
          width={242}
          height={190}
          className="object-cover w-[232px] h-[180px] isolate"
        />
      </div>
      <p className="p-[10px] mb-5 max-w-[232px] w-full bg-brown-10 border-2 border-brown-50 rounded-lg text-xs font-normal text-black-50 text-center shadow-outer/down">
        {content}
      </p>
      {isOwner && (
        <div className="flex gap-2 mb-3">
          <CommonButton type="button" size="sm" onClick={navigateToGarden}>
            {LEAF_INFO_TEXT.button[0]}
          </CommonButton>
          <CommonButton type="button" size="sm" onClick={AddDiary}>
            {LEAF_INFO_TEXT.button[1]}
          </CommonButton>
        </div>
      )}
    </div>
  );
}
