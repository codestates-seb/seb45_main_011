'use client';

import { motion } from 'framer-motion';

import useLeafsStore from '@/stores/leafsStore';
import useUserStore from '@/stores/userStore';

import useLeafsPageQueries from '@/hooks/useLeafsPageQueries';
import useEffectOnce from '@/hooks/useEffectOnce';

import { AddLeafButton, LeafDeleteModal } from '@/components/leafs';
import {
  Leaf,
  PageTitle,
  Screws,
  LoadingNotice,
  ErrorMessage,
  ShareButton,
  ShareModal,
  Footer,
} from '@/components/common';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';
import useModalStore from '@/stores/modalStore';

interface LeafsProps {
  params: { id: string };
}

export default function Leafs({ params }: LeafsProps) {
  const pathUserId = params.id;

  const { userId } = useUserStore();
  const { isOwner, setIsOwner } = useLeafsStore();
  const { isOpen, type } = useModalStore();

  const { leafs, user, isLoading, isError } = useLeafsPageQueries({
    pathUserId,
  });

  useEffectOnce(() => {
    if (userId === pathUserId) return setIsOwner(true);
    return setIsOwner(false);
  });

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center h-auto min-h-full pt-[120px] pb-[343px]">
        <div className="relative w-full min-w-[312px] max-w-[732px] h-[600px] mx-4 border-gradient rounded-xl shadow-container">
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
          {leafs && user && (
            <>
              <ShareButton location="leafs" position="top" />
              <div className="pt-7 pb-4 pl-6 pr-5 flex flex-col gap-5">
                <PageTitle
                  text={
                    isOwner
                      ? '내 식물 카드'
                      : `${user.displayName} 님의 식물 카드`
                  }
                />
                <div className="pt-2 pb-2 pl-2 pr-4 w-full h-[404px] overflow-y-scroll scrollbar grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1">
                  {isOwner && <AddLeafButton userId={userId} />}
                  {leafs?.map((leaf) => {
                    const { leafId, leafName, leafImageUrl } = leaf;

                    return (
                      <Leaf
                        key={leafId}
                        location="leaf"
                        name={leafName}
                        imageUrl={leafImageUrl}
                        leafId={String(leafId)}
                        pathUserId={pathUserId}
                      />
                    );
                  })}
                </div>
                {leafs && (
                  <div className="flex justify-center mt-[96px]">
                    <ShareButton location="leafs" position="bottom" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {isOpen &&
          (type === 'deleteLeaf' ? (
            <LeafDeleteModal />
          ) : (
            <ShareModal location="leafs" />
          ))}
      </motion.div>
      <Footer />
    </>
  );
}
