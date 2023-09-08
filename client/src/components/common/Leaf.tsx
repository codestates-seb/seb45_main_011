'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ControlButton from './ControlButton';
import LeafName from '../LeafName';

import useLeafsStore from '@/stores/leafsStore';
import useTestUserStore from '@/stores/testUserStore';

interface LeafProps {
  location: 'garden' | 'leaf';
  pathUserId?: number;
  imageUrl: string;
  name: string;
  leafId: number;
  selectedLeafId?: number | null;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Leaf({
  location,
  name,
  imageUrl,
  pathUserId,
  leafId,
  selectedLeafId,
  onClick,
}: LeafProps) {
  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);
  const modalOpen = useLeafsStore((state) => state.modalOpen);
  const setDeleteTargetId = useLeafsStore((state) => state.setDeleteTargetId);

  const handleLeafClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
      return null;
    }

    if (location === 'leaf') {
      router.push(`/leaf/${pathUserId}/${leafId}`);
      return null;
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/leaf/edit/${pathUserId}/${leafId}`);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    leafId: number,
  ) => {
    e.stopPropagation();
    setDeleteTargetId(leafId);
    modalOpen();
  };

  return (
    <div
      className={
        'relative flex flex-col items-center w-[200px] h-[205px] gap-2 cursor-pointer bg-transparent'
      }
      role="button"
      data-leaf-id={leafId}
      onClick={handleLeafClick}>
      {location === 'garden' && selectedLeafId === leafId ? (
        <div className="absolute flex justify-center items-center w-full h-full border-4 border-dashed border-brown-70 rounded-lg shadow-outer/down bg-brown-20 bg-opacity-[76%]">
          <Image
            src={'/assets/img/checked.svg'}
            alt="로고"
            width={36}
            height={28}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      ) : null}

      {location === 'leaf' && pathUserId === userId && (
        <div className="flex h-full gap-2 absolute right-2.5 top-2.5 z-10">
          <ControlButton usage="edit" handleEdit={handleEdit} />
          <ControlButton
            usage="delete"
            handleDelete={(event) => handleDelete(event, leafId)}
          />
        </div>
      )}
      <div className="relative w-[200px] h-[160px] rounded-xl border-2 border-brown-50 shadow-outer/down overflow-hidden">
        <Image src={imageUrl || ''} alt={name} fill className="object-cover" />
      </div>

      <LeafName name={name} />
    </div>
  );
}
