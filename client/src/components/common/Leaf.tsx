'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ControlButton from './ControlButton';
import LeafName from './LeafName';

import useLeafsStore from '@/stores/leafsStore';

interface LeafProps {
  location: 'garden' | 'leaf';
  userId: number;
  imageUrl: string;
  name: string;
  leafId: number;
}

export default function Leaf({
  location,
  name,
  imageUrl,
  userId,
  leafId,
}: LeafProps) {
  const router = useRouter();

  const [isClicked, setIsClicked] = useState(false);

  const modalOpen = useLeafsStore((state) => state.modalOpen);
  const setDeleteTargetId = useLeafsStore((state) => state.setDeleteTargetId);

  const handleLeafClick = () => {
    if (location === 'leaf') {
      router.push(`/leaf/${userId}/${leafId}`);
      return null;
    }
    setIsClicked((previous) => !previous);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/leaf/edit/${userId}/${leafId}`);
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
        'relative flex flex-col items-center w-[200px] gap-2 cursor-pointer bg-transparent'
      }
      role="button"
      onClick={handleLeafClick}>
      {location === 'garden' && isClicked ? (
        <div className="absolute flex justify-center items-center w-full h-full border-4 border-dashed border-brown-70 rounded-lg shadow-outer/down bg-brown-20 bg-opacity-[76%]">
          <Image
            src={'/assets/img/checked.svg'}
            alt="로고"
            width={36}
            height={28}
          />
        </div>
      ) : null}

      {location === 'leaf' && (
        <div className="flex gap-2 absolute right-2.5 top-2.5">
          <ControlButton usage="edit" handleEdit={handleEdit} />
          <ControlButton
            usage="delete"
            handleDelete={(event) => handleDelete(event, leafId)}
          />
        </div>
      )}

      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={160}
        className="object-cover w-[200px] h-[160px] rounded-xl border-2 border-brown-50 shadow-outer/down"
      />

      <LeafName name={name} />
    </div>
  );
}
