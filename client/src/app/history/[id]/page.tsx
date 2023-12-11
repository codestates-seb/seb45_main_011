'use client';

import { createPortal } from 'react-dom';

import { motion } from 'framer-motion';

import useModalStore, { ModalType } from '@/stores/modalStore';

import useModal from '@/hooks/useModal';

import {
  ResignModal,
  ConfirmModal,
  SuccessedModal,
  FailureModal,
  HistoryBox,
} from '@/components/history';
import { Footer } from '@/components/common';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

interface HistoryProps {
  params: { id: string };
}

export default function History({ params }: HistoryProps) {
  const { isOpen, type } = useModalStore();

  const { portalElement } = useModal(isOpen);

  const renderModal = (type: ModalType) => {
    if (type === 'ResignModal') return <ResignModal />;
    if (type === 'ConfirmModal') return <ConfirmModal />;
    if (type === 'SuccessedModal') return <SuccessedModal />;
    if (type === 'FailureModal') return <FailureModal />;
  };

  return (
    <>
      <motion.div
        variants={MOUNT_ANIMATION_VALUES}
        initial="initial"
        animate="animate"
        className="flex flex-col justify-center items-center h-auto min-h-full pb-[343px] mx-4">
        <HistoryBox paramsId={params.id} />

        {isOpen && portalElement
          ? createPortal(renderModal(type), portalElement)
          : null}
      </motion.div>
      <Footer />
    </>
  );
}
