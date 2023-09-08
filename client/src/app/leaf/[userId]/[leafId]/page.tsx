'use client';

import { useQuery } from '@tanstack/react-query';

import LeafInfo from '@/components/Leaf/LeafInfo';
import LeafDiary from '@/components/Leaf/LeafDiary';
import DiaryForm from '@/components/Leaf/DiaryForm';
import { DiaryDeleteModal } from '@/components/Leaf/DiaryDeleteModal';

import Screws from '@/components/common/Screws';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';

import useLeafStore from '@/stores/leafStore';

import { getLeaf } from '@/api/LeafAPI';

import { LeafDataInfo } from '@/types/data';

interface LeafProps {
  params: { leafId: string; userId: string };
}

export default function Leaf({ params }: LeafProps) {
  const leafId = Number(params.leafId);
  const userId = Number(params.userId);

  const {
    data: leaf,
    isLoading,
    isError,
  } = useQuery<LeafDataInfo>({
    queryKey: ['leaf', leafId],
    queryFn: () => getLeaf(leafId),
  });

  const modalCategory = useLeafStore((state) => state.modalCategory);
  const isModalOpen = useLeafStore((state) => state.isModalOpen);
  const targetDiary = useLeafStore((state) => state.targetDiary);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!leaf) return;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <div className="h-full p-5">
          <div className="h-full overflow-y-scroll scrollbar">
            <Screws />
            <LeafInfo
              userId={userId}
              leafName={leaf.leafName}
              imageUrl={leaf.leafImageUrl}
              content={leaf.content}
              createdAt={leaf.createdAt}
            />
            <LeafDiary userId={userId} leafId={leafId} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalPortal>
          <Modal>
            {modalCategory === 'add' && (
              <DiaryForm leafId={leafId} userId={userId} mode={modalCategory} />
            )}
            {modalCategory === 'edit' && (
              <DiaryForm
                leafId={leafId}
                userId={userId}
                diaryId={targetDiary?.journalId}
                title={targetDiary?.title}
                content={targetDiary?.content}
                imageUrl={targetDiary?.imageUrl}
                mode={modalCategory}
              />
            )}
            {modalCategory === 'delete' && (
              <DiaryDeleteModal
                leafId={leafId}
                userId={userId}
                deleteTargetId={targetDiary?.journalId}
              />
            )}
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
}
