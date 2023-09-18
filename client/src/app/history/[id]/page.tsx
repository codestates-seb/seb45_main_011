'use client';

import { motion } from 'framer-motion';

import useSignModalStore from '@/stores/signModalStore';

import ResignModal from '@/components/history/ResignModal';
import ConfirmModal from '@/components/history/ConfirmModal';
import SuccessedModal from '@/components/history/SuccessedModal';
import FailureModal from '@/components/history/FailureModal';
import HistoryBox from '@/components/history/HistoryBox';
import Footer from '@/components/common/Footer';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface HistoryProps {
  params: { id: string };
}

export default function History({ params }: HistoryProps) {
  const currentState = useSignModalStore((state) => state.currentState);

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex flex-col justify-center items-center mx-4 pb-[60px]">
        <HistoryBox paramsId={params.id} />

        {currentState === 'ResignModal' && <ResignModal />}
        {currentState === 'ConfirmModal' && <ConfirmModal />}
        {currentState === 'FailureModal' && <FailureModal />}
        {currentState === 'SuccessedModal' && <SuccessedModal />}
      </motion.div>
      <Footer />
    </>
  );
}
