'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import UserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';
import { DefaultProps, LeafDataInfo } from '@/types/common';

import ControlButton from './ControlButton';
import LeafName from './LeafName';
import CommonButton from './CommonButton';
import ModalPortal from './ModalPortal';
import Modal from './Modal';

interface LeafProps extends DefaultProps {
  location: 'garden' | 'leaf';
  data: LeafDataInfo;
}

export default function Leaf({ location, data }: LeafProps) {
  const userId = UserStore((state) => state.userId);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const isLeafDeleteModalOpen = useModalStore(
    (state) => state.isLeafDeleteModalOpen,
  );

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

  const handleDeleteClickAtModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLeafDeleteModalOpen(false);
    // fetch(...)
  };

  const handleCancelClickAtModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLeafDeleteModalOpen(false);
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

      {isLeafDeleteModalOpen ? (
        <ModalPortal>
          <Modal>
            <div className="flex flex-col justify-center w-full max-w-[531px] h-[316px] px-[3.25rem]">
              <p className="text-center font-bold text-[1.75rem] leading-9 text-brown-90 mb-10">
                정원에 설치한 식물 카드의 경우{' '}
                <b className="text-red-50">연결이 해제</b>됩니다.
              </p>
              <p className="text-center font-bold text-[2rem] leading-8 text-brown-70 mb-[2.875rem]">
                그래도 삭제하시겠습니까?
              </p>
              <div className="flex gap-1 justify-center">
                <CommonButton
                  usage="button"
                  size="lg"
                  handleDeleteClick={handleDeleteClickAtModal}>
                  삭제
                </CommonButton>
                <CommonButton
                  usage="button"
                  size="lg"
                  handleCancelClick={handleCancelClickAtModal}>
                  취소
                </CommonButton>
              </div>
            </div>
          </Modal>
        </ModalPortal>
      ) : null}
    </div>
  );
}
