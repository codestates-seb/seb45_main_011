import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal } from '../common';

import { PROFILE_MODAL_TEXT } from '@/constants/contents';

interface ChangeProfileModalProps {
  type: 'password' | 'nickname' | 'image';
}

export default function ChangeProfileModal({ type }: ChangeProfileModalProps) {
  const { close } = useModalStore();

  return (
    <Modal className="min-w-[312px] h-[200px] flex flex-col justify-center items-center mx-1">
      <section className="px-9 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <p className="font-bold text-brown-70 text-[28px] leading-9 text-center max-[790px]:text-[22px] max-[705px]:leading-7">
            {PROFILE_MODAL_TEXT[type]}&nbsp;
            <br className="hidden max-[845px]:block max-[790px]:hidden max-[705px]:block " />
            <span className="text-brown-90">변경되었습니다!</span>
          </p>
        </div>

        <div>
          <CommonButton
            type="button"
            size="sm"
            className="py-2 px-4 text-[20px]"
            onClose={close}>
            닫기
          </CommonButton>
        </div>
      </section>
    </Modal>
  );
}
