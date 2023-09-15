'use client';

import { useRouter } from 'next/navigation';

import useSignModalStore from '@/stores/signModalStore';
import useUserStore from '@/stores/userStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function SuccessedModal() {
  const router = useRouter();

  const close = useSignModalStore((state) => state.close);
  const setClear = useUserStore((state) => state.setClear);

  const allCloseData = () => {
    setClear();
    sessionStorage.clear();
    close();

    router.push('/');
  };

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[531px] h-fit flex flex-col justify-center items-center shadow-container">
        <div className="flex flex-col items-center gap-3 px-5 mt-10 mx-4">
          <div className="font-bold text-brown-80 text-[28px] break-keep">
            그동안&nbsp;
            <span className="font-bold text-brown-60 text-[28px]">
              Grow&nbsp;
            </span>
            <span className="font-bold text-brown-70 text-[28px]">Story</span>를
          </div>
          <div className="flex flex-col items-center font-bold text-brown-80 text-[28px] break-keep">
            <span>이용해 주셔서 감사합니다.</span>
            <span className="mt-7">다음에 또 놀러 오세요!</span>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              children="닫기"
              className="w-[96px] h-[52px] text-[24px] hover:scale-105 transition-transform mb-6"
              onClose={allCloseData}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
