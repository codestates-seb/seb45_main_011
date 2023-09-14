'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useLeafsStore from '@/stores/leafsStore';
import useUserStore from '@/stores/userStore';

import ControlButton from './ControlButton';
import LeafName from './LeafName';

interface LeafProps {
  location: 'garden' | 'leaf';
  pathUserId?: string;
  imageUrl: string;
  name: string;
  leafId: string;
  selectedLeafId?: string | null;
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

  const { modalOpen, setDeleteTargetId } = useLeafsStore();

  const userId = useUserStore((state) => state.userId);

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

  const navigateToLeafEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/leaf/edit/${pathUserId}/${leafId}`);
  };

  const openLeafDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    leafId: string,
  ) => {
    e.stopPropagation();
    setDeleteTargetId(leafId);
    modalOpen();
  };

  return (
    <div
      className="relative flex flex-col items-center w-[200px] h-[205px] gap-2 cursor-pointer bg-transparent hover:scale-105 transition-transform"
      role="button"
      data-leaf-id={leafId}
      onClick={handleLeafClick}>
      {location === 'garden' && selectedLeafId === leafId ? (
        <div className="absolute flex justify-center items-center w-full h-full border-4 border-dashed border-brown-70 rounded-lg shadow-outer/down bg-brown-20 bg-opacity-[76%]">
          <Image
            src={'/assets/icon/checked.svg'}
            alt="로고"
            width={36}
            height={28}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      ) : null}

      {location === 'leaf' && pathUserId === userId && (
        <div className="flex h-full gap-2 absolute right-2.5 top-2.5 z-10">
          <ControlButton usage="edit" handleEdit={navigateToLeafEdit} />
          <ControlButton
            usage="delete"
            handleDelete={(event) => openLeafDeleteModal(event, leafId)}
          />
        </div>
      )}
      <div
        data-leaf-id={leafId}
        className="w-[200px] h-[160px] rounded-xl border-2 border-brown-50 shadow-outer/down overflow-hidden">
        <Image
          src={imageUrl || ''}
          alt={name}
          width={210}
          height={170}
          className=" object-cover w-[200px] h-[160px]"
        />
      </div>

      <LeafName name={name} />
    </div>
  );
}
