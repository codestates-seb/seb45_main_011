'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQueries } from '@tanstack/react-query';

import { getDiariesByLeafAndUserId, getLeafByLeafId } from '@/api/leaf';

import useLeafStore from '@/stores/leafStore';
import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Screws from '@/components/common/Screws';
import LeafInfo from '@/components/leaf/LeafInfo';
import LeafDiary from '@/components/leaf/LeafDiary';
import LeafDateInfo from '@/components/leaf/LeafDateInfo';
import EmptyDiary from '@/components/leaf/EmptyDiary';
import LeafModal from '@/components/leaf/LeafModal';
import ShareButton from '@/components/common/ShareButton';
import LoadingNotice from '@/components/common/LoadingNotice';
import ErrorMessage from '@/components/common/ErrorMessage';
import ShareModal from '@/components/common/ShareModal';

import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

interface LeafProps {
  params: { leafId: string; userId: string };
}

export default function Leaf({ params }: LeafProps) {
  const pathLeafId = params.leafId;
  const pathUserId = params.userId;

  const router = useRouter();

  const userId = useUserStore((state) => state.userId);

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

  return (
    <div className="flex justify-center items-center pt-[120px] pb-[100px]">
      <div className="relative w-full min-w-[312px] max-w-[560px] h-[645px] mx-4 border-gradient rounded-xl shadow-container">
        <ShareButton location="leaf" position="top" />
        <div className="h-full pl-4 pr-1 py-8 mr-2">
          <Screws />
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <LoadingNotice isTransparent={true} />
            </div>
          )}
          {isError && (
            <div className="w-full h-full flex justify-center items-center">
              <ErrorMessage />
            </div>
          )}

          {leaf && (
            <div className="h-full overflow-y-scroll scrollbar">
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
          )}
        </div>
        <div className="flex justify-center my-6">
          <ShareButton location="leafs" position="bottom" />
        </div>
      </div>

      {isModalOpen &&
        isOwner &&
        (modalCategory === 'share' ? (
          <ShareModal location="leaf" />
        ) : (
          <LeafModal
            modalCategory={modalCategory}
            leafId={pathLeafId}
            userId={userId}
          />
        ))}
    </div>
  );
}
