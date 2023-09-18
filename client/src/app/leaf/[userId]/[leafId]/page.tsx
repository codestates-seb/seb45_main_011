'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';

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
import Footer from '@/components/common/Footer';

import { DiaryDataInfo, LeafDataInfo } from '@/types/data';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

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
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center pt-[120px] pb-[100px]">
        <div className="relative w-full min-w-[312px] max-w-[560px] h-[680px] mx-4 border-gradient rounded-xl shadow-container">
          {leaf && (
            <ShareButton
              location="leaf"
              position="top"
              className="right-[48px]"
            />
          )}
          <div className="h-full pl-4 pr-2 py-8 mr-2">
            <Screws />
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <LoadingNotice isTransparent={true} />
              </div>
            ) : isError ? (
              <div className="w-full h-full flex justify-center items-center">
                <ErrorMessage />
              </div>
            ) : (
              leaf && (
                <div className="h-full overflow-y-scroll scrollbar pr-2">
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
                    <EmptyDiary
                      pathUserId={pathUserId}
                      userId={userId}
                      info="diary"
                      addInfo="addDiary"
                      className="max-[380px]:w-[240px]"
                    />
                  ) : (
                    <LeafDiary
                      pathUserId={pathUserId}
                      diaries={diaries as DiaryDataInfo[]}
                    />
                  )}
                </div>
              )
            )}
          </div>
          {leaf && (
            <div className="flex justify-center my-6">
              <ShareButton location="leaf" position="bottom" />
            </div>
          )}
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
      </motion.div>
      <Footer />
    </>
  );
}
