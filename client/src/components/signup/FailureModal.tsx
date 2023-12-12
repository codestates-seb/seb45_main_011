import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal } from '../common';

export default function FailureModal() {
  const { changeType } = useModalStore();

  const handleCodeFailure = () => {
    return changeType('AuthEmailModal');
  };

  return (
    <Modal className="w-full min-w-[312px] max-w-[440px] h-fit flex flex-col justify-center items-center max-[480px]:max-w-[312px]">
      <div className="flex flex-col items-center gap-6 px-5 mt-10 mx-4">
        <div className="flex flex-col items-center gap-1">
          <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8">
            인증에&nbsp;
            <span className="text-red-50">실패했습니다.</span>
          </p>
          <p className="font-bold text-brown-90 text-2xl">다시 입력해주세요.</p>
        </div>

        <div>
          <CommonButton
            type="button"
            size="md"
            className="w-[144px] h-[52px] mb-8 text-[24px]"
            onFailure={handleCodeFailure}>
            뒤로 가기
          </CommonButton>
        </div>
      </div>
    </Modal>
  );
}
