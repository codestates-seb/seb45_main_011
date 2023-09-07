import useSignModalStore from '@/stores/signModalStore';
import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function FailureModal() {
  const { failure } = useSignModalStore();

  const handleCodeFailure = () => {
    return failure('AuthEmailModal');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[240px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[28px]">
              인증에 <span className="text-red-50">실패했습니다.</span>
            </p>
            <p className="font-bold text-brown-90  text-[28px]">
              다시 입력해주세요.
            </p>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              children="뒤로 가기"
              className="w-[155px] h-[52px] text-[24px]"
              onFailure={handleCodeFailure}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
