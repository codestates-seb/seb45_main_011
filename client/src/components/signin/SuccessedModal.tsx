import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function SuccessedModal() {
  const close = useSignModalStore((state) => state.close);

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[531px] h-fit flex flex-col justify-center items-center max-[572px]:max-w-[360px] max-[480px]:max-w-[312px]">
        <div className="flex flex-col items-center gap-6 px-5 mt-8 mx-4">
          <div className="flex flex-col items-center gap-1">
            <p className="font-bold text-brown-70 text-2xl text-center break-keep max-[480px]:text-xl">
              임시 비밀번호가 발송되었습니다.
            </p>
            <p className="font-bold text-brown-70 text-2xl text-center break-keep max-[480px]:text-xl">
              로그인 후&nbsp;
              <span className="text-brown-90 text-[28px] max-[480px]:text-2xl">
                비밀번호를 변경해주세요.
              </span>
            </p>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              children="닫기"
              className="mb-8"
              onClose={close}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
