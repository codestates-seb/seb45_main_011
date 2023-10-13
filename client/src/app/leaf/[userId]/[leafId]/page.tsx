'use client';

import { motion } from 'framer-motion';

import useModalStore from '@/stores/modalStore';
import useLeafStore from '@/stores/leafStore';
import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';
import useGetLeafPageQueries from '@/hooks/useGetLeafPageQueries';

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
import Screws from '@/components/common/Screws';

import { DiaryDataInfo } from '@/types/data';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface LeafProps {
  params: { leafId: string; userId: string };
}

export default function Leaf({ params }: LeafProps) {
  const pathLeafId = params.leafId;
  const pathUserId = params.userId;

  const userId = useUserStore((state) => state.userId);

  const { isOwner, setIsOwner } = useLeafStore();

  const { type, isOpen } = useModalStore();

  useEffectOnce(() => {
    if (userId === pathUserId) return setIsOwner(true);
    return setIsOwner(false);
  });

  const { leaf, diaries, isLoading, isError, isEmpty } = useGetLeafPageQueries({
    pathUserId,
    pathLeafId,
  });

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center h-auto min-h-full pt-[120px] pb-[343px]">
        <div className="relative w-full min-w-[312px] max-w-[560px] h-[680px] mx-4 border-gradient rounded-xl shadow-container">
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
                <>
                  <ShareButton
                    location="leaf"
                    position="top"
                    className="right-[48px]"
                  />
                  <div className="h-full">
                    <LeafInfo
                      pathUserId={pathUserId}
                      leafName={leaf?.leafName}
                      imageUrl={leaf?.leafImageUrl}
                      content={leaf?.content}
                    />
                    <LeafDateInfo />
                    {isEmpty ? (
                      <EmptyDiary
                        info="diary"
                        addInfo="addDiary"
                        className="max-[380px]:w-[240px]"
                      />
                    ) : (
                      <LeafDiary diaries={diaries as DiaryDataInfo[]} />
                    )}
                  </div>
                </>
              )
            )}
          </div>
          {leaf && (
            <div className="flex justify-center my-6">
              <ShareButton location="leaf" position="bottom" />
            </div>
          )}
        </div>

        {isOpen &&
          isOwner &&
          (type === 'share' ? (
            <ShareModal location="leaf" />
          ) : (
            <LeafModal
              modalCategory={type}
              leafId={pathLeafId}
              userId={userId}
            />
          ))}
      </motion.div>
      <Footer />
    </>
  );
}
