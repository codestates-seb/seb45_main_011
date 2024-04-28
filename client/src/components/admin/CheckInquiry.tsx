'use client';

import useModalStore, { ModalType } from '@/stores/modalStore';

import useUpdateChatAnsweredMutation from '@/hooks/mutation/useUpdateChatAnsweredMutation';

import { ChatModal, InquiryTable } from '.';

export default function CheckInquiry() {
  const { isOpen, type, close } = useModalStore();

  const { mutate: onAnswered } = useUpdateChatAnsweredMutation();

  const handleAnswered = () => {
    onAnswered();
  };

  const renderModal = (type: ModalType) => {
    if (type === 'ChatModal') {
      return <ChatModal close={close} handleAnswered={handleAnswered} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <InquiryTable />
      </div>

      {isOpen && renderModal(type)}
    </div>
  );
}
