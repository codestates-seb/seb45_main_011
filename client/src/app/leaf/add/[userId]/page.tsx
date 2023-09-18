'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import LeafForm from '@/components/common/LeafForm';
import Footer from '@/components/common/Footer';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface AddLeafProps {
  params: { userId: string };
}

export default function AddLeaf({ params }: AddLeafProps) {
  const pathUserId = params.userId;

  const router = useRouter();

  const userId = useUserStore((state) => state.userId);

  useEffectOnce(() => {
    if (userId !== pathUserId) router.back();
  });

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center pt-[120px] pb-[60px]">
        <div className="relative w-full min-w-[312px] max-w-[540px] h-full mx-4 border-gradient rounded-xl shadow-container">
          <Screws />
          <div className="p-5 h-full">
            <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar">
              <PageTitle text="식물 카드 등록" className="mt-3 mb-6" />
              <LeafForm userId={pathUserId} mode="add" />
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
