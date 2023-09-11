'use client';

import useSignModalStore from '@/stores/signModalStore';

import HistoryForm from '@/components/history/HistoryForm';
import ResignModal from '@/components/history/ResignModal';
import ComfirmModal from '@/components/history/ComfirmModal';
import SuccessedModal from '@/components/history/SuccessedModal';
import FailureModal from '@/components/history/FailureModal';

export default function History() {
  const { currentState } = useSignModalStore();

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/img/bg_default.png')] bg-contain">
      <HistoryForm />

      {currentState === 'ResignModal' && <ResignModal />}
      {currentState === 'ComfirmModal' && <ComfirmModal />}
      {currentState === 'FailureModal' && <FailureModal />}
      {currentState === 'SuccessedModal' && <SuccessedModal />}
    </div>
  );
}
