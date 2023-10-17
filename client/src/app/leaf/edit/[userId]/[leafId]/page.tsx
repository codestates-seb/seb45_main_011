'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';
import useLeafQuery from '@/hooks/useLeafQuery';

import { PageTitle, Screws, LeafForm, Footer } from '@/components/common';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';
import { LEAF_EDIT_PAGE_TEXT } from '@/constants/contents';

interface EditLeafProps {
  params: { userId: string; leafId: string };
}

export default function EditLeaf({ params }: EditLeafProps) {
  const leafId = params.leafId;
  const pathUserId = params.userId;

  const router = useRouter();

  const userId = useUserStore((state) => state.userId);

  const { leaf, isLoading, isError } = useLeafQuery(
    userId === pathUserId,
    leafId,
  );

  useEffectOnce(() => {
    if (pathUserId !== userId) router.back();
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center h-auto min-h-full pt-[120px] pb-[343px]">
        <div className="relative w-full min-w-[312px] max-w-[540px] h-full mx-4 border-gradient rounded-xl shadow-container">
          <Screws />
          <div className="p-5 h-full">
            <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar">
              <PageTitle
                text={LEAF_EDIT_PAGE_TEXT.title}
                className="mt-3 mb-6"
              />
              <LeafForm
                leaf={leaf}
                leafId={leafId}
                userId={pathUserId}
                mode="edit"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
