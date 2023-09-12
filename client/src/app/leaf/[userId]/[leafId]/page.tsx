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
// 컨벤션 협의 썰 정리하자
import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

interface LeafProps {
  params: { leafId: string; userId: string };
}

// TODO: Leaf 날짜 부분 컴포넌트 분리 / leaf 리팩토링
export default function Leaf({ params }: LeafProps) {
  const pathLeafId = Number(params.leafId);
  const pathUserId = Number(params.userId);

  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);

  // 변수 선언 부분은 앞 쪽이 좋다.
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

  const isEmpty = diaries && diaries?.length === 0;

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
    if (diaries && diaries.length !== 0)
      setLastDiaryDay(new Date(diaries[0].createdAt));
  }, [diaries]);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!leaf) return <div>error</div>;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[645px] border-gradient rounded-xl">
        <div className="h-full p-5">
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
            {/* 예외를 앞으로. */}
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
      {isModalOpen && pathUserId === userId && (
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
