import useSignModalStore from '@/stores/signModalStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function SuccessedModal() {
  const close = useSignModalStore((state) => state.close);

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[400px] h-fit flex flex-col justify-center items-center max-[572px]:max-w-[360px] max-[480px]:max-w-[312px]">
        <div className="flex flex-col items-center gap-5 px-4 pt-8 pb-6 text-[22px]">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-center break-keep leading-7">
              임시 비밀번호가 발송되었습니다.
            </p>
            <p className="font-bold text-brown-70 text-center break-keep leading-7">
              로그인 후&nbsp;
              <span className="text-brown-90">비밀번호를 변경해주세요.</span>
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
