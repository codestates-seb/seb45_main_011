import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function ChangePasswordModal() {
  const close = useSignModalStore((state) => state.close);

  return (
    <ModalPortal>
      <Modal className="min-w-[440px] h-[200px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[28px]">
              비밀번호가 <span className="text-brown-90">변경되었습니다!</span>
            </p>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              children="닫기"
              className="w-[96px] h-[52px] text-[24px]"
              onClose={close}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
