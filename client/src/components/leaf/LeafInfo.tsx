import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useLeafStore from '@/stores/leafStore';

import PageTitle from '../common/PageTitle';
import CommonButton from '../common/CommonButton';

interface LeafInfoProps {
  pathUserId: string;
  leafName: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  userId: string | null;
}

export default function LeafInfo({
  leafName,
  imageUrl,
  content,
  pathUserId,
  userId,
}: LeafInfoProps) {
  const router = useRouter();

  const setModalCategory = useLeafStore((state) => state.setModalCategory);
  const modalOpen = useLeafStore((state) => state.modalOpen);

  const isOwner = userId === pathUserId;

  const navigateToGarden = () => router.push(`/garden/${pathUserId}`);

  const AddDiary = () => {
    setModalCategory('add');
    modalOpen();
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
            정원에 설치하기
          </CommonButton>
          <CommonButton type="button" size="sm" onClick={AddDiary}>
            일지 작성
          </CommonButton>
        </div>
      )}
    </div>
  );
}
