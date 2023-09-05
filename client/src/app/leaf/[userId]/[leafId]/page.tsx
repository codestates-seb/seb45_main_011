'use client';

import { useEffect, useState } from 'react';

import useLeafStore from '@/stores/leafStore';
import useModalStore from '@/stores/modalStore';

import LeafInfo from '@/components/LeafInfo';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import DiaryForm from '@/components/DiaryForm';
import LeafDiary from '@/components/LeafDiary';
import Screws from '@/components/common/Screws';
import data from '@/mock/leaf.json';

import { LeafDataInfo } from '@/types/common';
import { DiaryDeleteModal } from '@/components/DiaryDeleteModal';

export default function Leaf({ params }: { params: { leafId: string } }) {
  const isModalOpen = useModalStore((state) => state.isDiaryModalOpen);
  const diary = useLeafStore((state) => state.diary);
  const modalCategory = useLeafStore((state) => state.modalCategory);
  const [leaf, setLeaf] = useState<LeafDataInfo | null>(null);
  const leafId = params.leafId;
  useEffect(() => {
    setLeaf(data[parseInt(leafId)]);
  });
  if (!leaf) return <p>전달된 leaf 데이터가 없습니다.</p>;
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <div className="h-full p-5">
          <div className="h-full overflow-y-scroll scrollbar">
            <Screws />
            <LeafInfo leaf={leaf} />

            <LeafDiary leafId={String(leaf.leafId)} diary={leaf.diary || []} />
            {isModalOpen ? (
              <ModalPortal>
                <Modal>
                  {modalCategory === 'add' ? (
                    <DiaryForm diary={diary} />
                  ) : (
                    <DiaryDeleteModal />
                  )}
                </Modal>
              </ModalPortal>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
