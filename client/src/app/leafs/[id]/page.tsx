'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { getLeafsByUserId } from '@/api/leaf';
import { getUserInfo } from '@/api/history';

import useLeafsStore from '@/stores/leafsStore';
import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Leaf from '@/components/common/Leaf';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import AddLeafButton from '@/components/leafs/AddLeafButton';
import LeafDeleteModal from '@/components/leafs/LeafDeleteModal';
import LoadingNotice from '@/components/common/LoadingNotice';
import ErrorMessage from '@/components/common/ErrorMessage';
import ShareButton from '@/components/common/ShareButton';
import ShareModal from '@/components/common/ShareModal';
import Footer from '@/components/common/Footer';

import { LeafsDataInfo } from '@/types/data';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface LeafsProps {
  params: { id: string };
}

export default function Leafs({ params }: LeafsProps) {
  const pathUserId = params.id;

  const { userId } = useUserStore();
  const { isModalOpen, modalCategory } = useLeafsStore();

  const {
    data: leafs,
    isLoading,
    isError,
  } = useQuery<LeafsDataInfo[]>({
    queryKey: ['leafs'],
    queryFn: () => getLeafsByUserId(pathUserId),
  });

  const { data: user } = useQuery({
    queryKey: ['user', pathUserId],
    queryFn: () => getUserInfo(pathUserId),
  });

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center h-auto min-h-full pt-[120px] pb-[343px]">
        <div className="relative w-full min-w-[312px] max-w-[732px] h-[600px] mx-4 border-gradient rounded-xl shadow-container">
          {leafs && <ShareButton location="leafs" position="top" />}

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
            <div className="pt-7 pb-4 pl-6 pr-5 flex flex-col gap-5">
              <PageTitle
                text={
                  pathUserId === userId
                    ? '내 식물 카드'
                    : `${user.data.displayName} 님의 식물 카드`
                }
              />
              <div className="pt-2 pb-2 pl-2 pr-4 w-full h-[404px] overflow-y-scroll scrollbar grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1">
                {userId === pathUserId && <AddLeafButton userId={+userId} />}
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
          )}
        </div>

        {isModalOpen &&
          (modalCategory === 'deleteLeaf' ? (
            <LeafDeleteModal pathUserId={pathUserId} userId={userId} />
          ) : (
            <ShareModal location="leafs" />
          ))}
      </motion.div>
      <Footer />
    </>
  );
}
