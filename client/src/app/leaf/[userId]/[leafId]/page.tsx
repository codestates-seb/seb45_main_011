'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQueries } from '@tanstack/react-query';

import { getDiaries, getLeaf } from '@/api/leaf';

import useLeafStore from '@/stores/leafStore';
import useTestUserStore from '@/stores/testUserStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Screws from '@/components/common/Screws';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import LeafInfo from '@/components/Leaf/LeafInfo';
import LeafDiary from '@/components/Leaf/LeafDiary';
import DiaryForm from '@/components/Leaf/DiaryForm';
import { DiaryDeleteModal } from '@/components/Leaf/DiaryDeleteModal';

import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

interface LeafProps {
  params: { leafId: string; userId: string };
}

export default function Leaf({ params }: LeafProps) {
  const leafId = Number(params.leafId);
  const pathUserId = Number(params.userId);

  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);

  useEffectOnce(() => {
    if (!userId) {
      router.push('/signin');
    }
  });

  const [leaf, setLeaf] = useState<LeafDataInfo>();
  const [diaries, setDiaries] = useState<DiaryDataInfo[]>();

  const results = useQueries({
    queries: [
      {
        queryKey: ['leaf', leafId],
        queryFn: () => getLeaf(leafId),
      },
      {
        queryKey: ['diaries', leafId],
        queryFn: () => getDiaries(leafId, pathUserId),
      },
    ],
  });

  useEffect(() => {
    setLeaf(results[0].data);
    setDiaries(results[1].data);
  }, [results]);

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  const modalCategory = useLeafStore((state) => state.modalCategory);
  const isModalOpen = useLeafStore((state) => state.isModalOpen);
  const targetDiary = useLeafStore((state) => state.targetDiary);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  if (!leaf || !diaries) return;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <div className="h-full p-5">
          <div className="h-full overflow-y-scroll scrollbar">
            <Screws />
            <LeafInfo
              userId={userId}
              pathUserId={pathUserId}
              leafName={leaf.leafName}
              imageUrl={leaf.leafImageUrl}
              content={leaf.content}
              createdAt={leaf.createdAt}
            />
            <LeafDiary pathUserId={pathUserId} diaries={diaries} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalPortal>
          <Modal>
            {modalCategory === 'add' && (
              <DiaryForm
                leafId={leafId}
                userId={pathUserId}
                mode={modalCategory}
              />
            )}
            {modalCategory === 'edit' && (
              <DiaryForm
                leafId={leafId}
                userId={pathUserId}
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
                userId={pathUserId}
                deleteTargetId={targetDiary?.journalId}
              />
            )}
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
}
