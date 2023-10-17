import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal, ModalPortal } from '../common';

export default function FailureModal() {
  const { changeType } = useModalStore();

  const handleEmailFailure = () => {
    return changeType('FindPasswordModal');
  };

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[480px] h-fit flex flex-col justify-center items-center max-[480px]:max-w-[312px]">
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="flex flex-col items-center gap-3 px-5">
            <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8 max-[480px]:text-2xl">
              <b className="text-red-50">등록되지 않은&nbsp;</b>
              &nbsp;이메일입니다.
            </p>
            <p className="font-bold text-brown-90 text-[28px] max-[480px]:text-2xl">
              다시 입력해주세요.
            </p>
          </div>

          <div>
            <CommonButton
              type="button"
              size="md"
              className="w-[155px] h-[52px] text-[24px]"
              onFailure={handleEmailFailure}>
              뒤로 가기
            </CommonButton>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
