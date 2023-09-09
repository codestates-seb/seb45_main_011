import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function SuccessedModal() {
  const { close } = useSignModalStore();

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[240px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[24px]">
              임시 비밀번호가 발송되었습니다.
            </p>
            <p className="font-bold text-brown-70  text-[28px]">
              로그인 후&nbsp;
              <span className="text-brown-90">비밀번호를 변경해주세요.</span>
            </p>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              children="닫기"
              className="w-[155px] h-[52px] text-[24px]"
              onClose={close}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
