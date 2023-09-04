import Image from 'next/image';

import { LeafDataInfo } from '@/types/common';

import PageTitle from './common/PageTitle';
import Screws from './common/Screws';
import CommonButton from './common/CommonButton';
import LeafDiary from './LeafDiary';
import useModalStore from '@/stores/modalStore';
import ModalPortal from './common/ModalPortal';
import Modal from './common/Modal';
import { useState } from 'react';
import DiaryForm from './DiaryForm';

interface LeafInfoProps {
  leaf: LeafDataInfo;
}

/** 현재 날짜(now)와 비교할 날짜(day) 사이의 일수를 계산하는 함수 */
const getDayElapsed = (now: Date, day: Date) => {
  const timeDifference = now.getTime() - day.getTime();
  return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
};

export default function LeafInfo({ leaf }: LeafInfoProps) {
  if (leaf === null) return;
  const [modalCategory, setModalCategory] = useState('');
  const startDay = new Date(leaf.start);
  const now = new Date();
  /** 식물 카드를 등록한 날로부터 경과한 일수 */
  const daysSinceStart = getDayElapsed(now, startDay);
  /** 최근 일지를 작성한 날로부터 경과한 일수 (다이어리가 없다면 null)*/
  const recentManaged = leaf.diary
    ? getDayElapsed(now, new Date(leaf.diary[leaf.diary.length - 1].date)) +
      '일 전'
    : null;
  const isModalOpen = useModalStore((state) => state.isDiaryModalOpen);
  const setIsModalOpen = useModalStore((state) => state.setIsDiaryModalOpen);
  const handleDiaryAddAndEdit = (e: React.MouseEvent, category: string) => {
    setModalCategory(category);
    setIsModalOpen(true);
    console.log('edit');
  };
  const handleDiaryDelete = (e: React.MouseEvent, category: string) => {
    setModalCategory(category);
    setIsModalOpen(true);
    console.log('delete');
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <Screws />
        <div className="h-full p-5">
          <div className="h-full overflow-y-scroll scrollbar">
            <div className="flex flex-col items-center">
              <PageTitle className=" mb-5" text={leaf.leafNickname} />
              <Image
                className="w-[232px] h-[180px] object-cover mb-2 border-2 border-brown-50 rounded-lg"
                src={leaf.imageUrl}
                alt={leaf.leafNickname}
                width={232}
                height={180}
              />
              <p className="p-[10px] mb-5 max-w-[232px] w-full bg-brown-10 border-2 border-brown-50 rounded-lg text-xs font-normal text-center">
                {leaf.content}
              </p>
              <div className="flex gap-2 mb-3">
                <CommonButton usage="button" size="sm">
                  정원에 설치하기
                </CommonButton>
                <CommonButton
                  usage="button"
                  size="sm"
                  handleAddDiary={(e) => handleDiaryAddAndEdit(e, 'add')}>
                  일지 작성
                </CommonButton>
              </div>
              <p className="mb-2 font-bold text-sm leading-4 text-brown-70">
                키우기 시작한 지 :{' '}
                <b className="text-[1rem] font-bold leading-4 text-brown-80">
                  {daysSinceStart}일 째
                </b>
              </p>
              <p className="mb-6 font-bold text-sm leading-4 text-brown-70">
                최근 관리 :{' '}
                <b className="text-[1rem] font-bold leading-4 text-brown-80">
                  {recentManaged || ' - '}
                </b>
              </p>
            </div>

            <LeafDiary leafId={String(leaf.leafId)} diary={leaf.diary || []} />
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <ModalPortal>
          <Modal>
            {modalCategory === 'add' ? (
              <DiaryForm />
            ) : modalCategory === 'edit' ? (
              <div>edit</div>
            ) : (
              <div>delete</div>
            )}
          </Modal>
        </ModalPortal>
      ) : null}
    </div>
  );
}
