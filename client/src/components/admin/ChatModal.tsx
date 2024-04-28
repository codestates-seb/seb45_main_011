import { Chat } from '../inquiry';
import { CommonButton, Modal } from '../common';

interface ChatModalProps {
  close: () => void;
  handleAnswered: () => void;
}

export default function ChatModal({ close, handleAnswered }: ChatModalProps) {
  return (
    <Modal>
      <div className="w-[416px] max-[500px]:w-[270px] px-2 py-2 mx-2 flex flex-col justify-center items-center border-2 rounded-lg border-brown-50 bg-brown-20">
        <Chat role="admin" />

        <div className="flex justify-center items-center">
          <CommonButton
            type="button"
            size="md"
            className="mx-1 my-2 max-[580px]:text-[16px]"
            onClose={() => close()}>
            종료하기
          </CommonButton>

          <CommonButton
            type="button"
            size="md"
            className="mx-1 my-2 max-[580px]:text-[16px]"
            onClose={() => handleAnswered()}>
            메일 전송
          </CommonButton>
        </div>
      </div>
    </Modal>
  );
}
