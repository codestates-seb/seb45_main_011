import useSignModalStore from '@/stores/signModalStore';
import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function FailureModal() {
  const { failure } = useSignModalStore();

  const handleEmailFailure = () => {
    return failure('FindPasswordModal');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[240px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[28px]">
              <span className="text-red-50">등록되지 않은 </span> 이메일입니다.
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
              onFailure={handleEmailFailure}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
