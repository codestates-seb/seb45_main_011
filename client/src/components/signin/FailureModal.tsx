import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function FailureModal() {
  const { changeState } = useSignModalStore();

  const handleEmailFailure = () => {
    return changeState('FindPasswordModal');
  };

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[480px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="flex flex-col items-center gap-3 px-5">
            <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8">
              <b className="text-red-50">등록되지 않은 </b> 이메일입니다.
            </p>
            <p className="font-bold text-brown-90  text-[28px]">
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
