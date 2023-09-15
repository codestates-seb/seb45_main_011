import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function FailureModal() {
  const changeState = useSignModalStore((state) => state.changeState);

  const handleCodeFailure = () => {
    return changeState('AuthEmailModal');
  };

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[440px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-6 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8">
              인증에
              <span className="text-red-50"> 실패했습니다.</span>
            </p>
            <p className="font-bold text-brown-90 text-2xl">
              다시 입력해주세요.
            </p>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              className="w-[155px] h-[52px] mb-8 text-[24px]"
              onFailure={handleCodeFailure}>
              뒤로 가기
            </CommonButton>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
