'use client';

import Image from 'next/image';
import { useState } from 'react';

import { DefaultProps, LeafInfo } from '@/types/common';

import ControlButton from './ControlButton';
import LeafName from './LeafName';

interface LeafProps extends DefaultProps {
  location: 'garden' | 'leaf';
  data: LeafInfo;
}

export default function Leaf({ location, data }: LeafProps) {
  const [isClicked, setIsClicked] = useState(false);
  const handleLeafClick = () => {
    if (location === 'leaf') {
      console.log('식물 카드 목록에서 클릭된 Leaf');
      return null;
    }

    console.log('정원 페이지에서 클릭된 Leaf');
    setIsClicked((previous) => !previous);
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
          <ControlButton usage="edit" />
          <ControlButton usage="delete" />
        </div>
      ) : null}

      <Image
        src={data.imageUrl}
        alt="로고"
        width={200}
        height={160}
        className="object-cover w-[200px] h-[160px] rounded-xl border-2 border-brown-50 shadow-outer/down"
      />

      <LeafName name={data.leafNickname} />
    </div>
  );
}
