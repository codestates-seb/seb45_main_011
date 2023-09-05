'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import useModalStore from '@/stores/modalStore';

import { DefaultProps, LeafDataInfo } from '@/types/common';

import ControlButton from './ControlButton';
import LeafName from './LeafName';

interface LeafProps extends DefaultProps {
  location: 'garden' | 'leaf';
  data: LeafDataInfo;
  userId: string;
}

export default function Leaf({ location, data, userId }: LeafProps) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const setIsLeafDeleteModalOpen = useModalStore(
    (state) => state.setIsLeafDeleteModalOpen,
  );

  const handleLeafClick = () => {
    if (location === 'leaf') {
      router.push(`/leaf/${userId}/${data.leafId}`);
      return null;
    }
    setIsClicked((previous) => !previous);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/leaf/edit/${userId}/${data.leafId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLeafDeleteModalOpen(true);
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

      {location === 'leaf' ? (
        <div className="flex gap-2 absolute right-2.5 top-2.5">
          <ControlButton usage="edit" handleEditClick={handleEditClick} />
          <ControlButton usage="delete" handleDeleteClick={handleDeleteClick} />
        </div>
      ) : null}

      <Image
        src={data.imageUrl}
        alt="로고"
        width={200}
        height={160}
        className="object-cover w-[200px] h-[160px] rounded-xl border-2 border-brown-50"
      />

      <LeafName name={data.leafNickname} />
    </div>
  );
}
