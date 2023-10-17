import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function ChangePasswordModal() {
  const close = useSignModalStore((state) => state.close);

  return (
    <ModalPortal>
      <Modal className="min-w-[312px] h-[200px] flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-6 px-9">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[28px] leading-9 text-center max-[790px]:text-[22px] max-[750px]:leading-7">
              비밀번호가
              <br className="hidden max-[901px]:block max-[790px]:hidden max-[750px]:block " />{' '}
              <span className="text-brown-90">변경되었습니다!</span>
            </p>
          </div>
          <div>
            <CommonButton
              type="button"
              size="sm"
              children="닫기"
              className="py-2 px-4 text-[20px]"
              onClose={close}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
