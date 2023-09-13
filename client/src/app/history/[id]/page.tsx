'use client';

import { useParams } from 'next/navigation';

import useSignModalStore from '@/stores/signModalStore';

import ResignModal from '@/components/history/ResignModal';
import ComfirmModal from '@/components/history/ComfirmModal';
import SuccessedModal from '@/components/history/SuccessedModal';
import FailureModal from '@/components/history/FailureModal';
import HistoryBox from '@/components/history/HistoryBox';

export default function History() {
  const { id } = useParams();
  const pathId = id as string;

  const { currentState } = useSignModalStore();

  return (
    <div className="flex justify-center items-center h-full bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_default.png')] pt-[120px]">
      <HistoryBox paramsId={pathId} />

      {currentState === 'ResignModal' && <ResignModal />}
      {currentState === 'ComfirmModal' && <ComfirmModal />}
      {currentState === 'FailureModal' && <FailureModal />}
      {currentState === 'SuccessedModal' && <SuccessedModal />}
    </div>
  );
}
