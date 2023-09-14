'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQueries } from '@tanstack/react-query';

import { getDiariesByLeafAndUserId, getLeafByLeafId } from '@/api/leaf';

import useLeafStore from '@/stores/leafStore';
import useTestUserStore from '@/stores/testUserStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Screws from '@/components/common/Screws';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import LeafInfo from '@/components/leaf/LeafInfo';
import LeafDiary from '@/components/leaf/LeafDiary';
import LeafDateInfo from '@/components/leaf/LeafDateInfo';
import EmptyDiary from '@/components/leaf/EmptyDiary';
import LeafModal from '@/components/leaf/LeafModal';
import ShareButton from '@/components/common/ShareButton';

import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

interface LeafProps {
  params: { leafId: string; userId: string };
}

export default function Leaf({ params }: LeafProps) {
  const pathLeafId = Number(params.leafId);
  const pathUserId = Number(params.userId);

  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);

  const isOwner = userId === pathUserId;

  const { modalCategory, isModalOpen, setStartDay, setLastDiaryDay } =
    useLeafStore();

  const [leaf, setLeaf] = useState<LeafDataInfo>();
  const [diaries, setDiaries] = useState<DiaryDataInfo[]>();

  const results = useQueries({
    queries: [
      {
        queryKey: ['leaf', pathLeafId],
        queryFn: () => getLeafByLeafId(pathLeafId),
      },
      {
        queryKey: ['diaries', pathLeafId],
        queryFn: () => getDiariesByLeafAndUserId(pathLeafId, pathUserId),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  const isEmpty = !diaries || diaries?.length === 0;

  useEffectOnce(() => {
    if (!userId) {
      router.push('/signin');
    }
  });

  useEffect(() => {
    if (results) {
      setLeaf(results[0].data);
      setDiaries(results[1].data);
    }
  }, [results]);

  useEffect(() => {
    if (leaf?.createdAt) setStartDay(new Date(leaf.createdAt));
  }, [leaf]);

  useEffect(() => {
    if (!isEmpty) setLastDiaryDay(new Date(diaries[0].createdAt));
  }, [diaries]);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!leaf) return <div>error</div>;

  return (
    <div className="pt-[120px] w-full flex justify-center items-center">
      <div className="relative w-full min-w-[312px] max-w-[560px] h-[645px] mx-4 border-gradient rounded-xl shadow-container">
        <ShareButton />
        <div className="h-full pl-4 pr-1 py-8 mr-2">
          <div className="h-full overflow-y-scroll scrollbar">
            <Screws />
            <LeafInfo
              userId={userId}
              pathUserId={pathUserId}
              leafName={leaf?.leafName}
              imageUrl={leaf?.leafImageUrl}
              content={leaf?.content}
              createdAt={leaf?.createdAt}
            />
            <LeafDateInfo />
            {isEmpty ? (
              <EmptyDiary pathUserId={pathUserId} userId={userId} />
            ) : (
              <LeafDiary
                pathUserId={pathUserId}
                diaries={diaries as DiaryDataInfo[]}
              />
            )}
          </div>
        </div>
      </div>
      {isModalOpen && isOwner && (
        <ModalPortal>
          <Modal>
            <LeafModal
              modalCategory={modalCategory}
              leafId={pathLeafId}
              userId={userId}
            />
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
}
