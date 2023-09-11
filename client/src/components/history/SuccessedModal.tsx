'use client';

import { useRouter } from 'next/navigation';

import useSignModalStore from '@/stores/signModalStore';
import useUserStore from '@/stores/userStore';

import CommonButton from '../common/CommonButton';
import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';

export default function SuccessedModal() {
  const { close } = useSignModalStore();
  const setClear = useUserStore((state) => state.setClear);
  const router = useRouter();

  const allCloseData = () => {
    setClear();
    sessionStorage.clear();
    close();
    router.push('/');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[350px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="font-bold text-brown-90 text-3xl">
            그동안&nbsp;
            <span className="font-bold text-brown-60  text-[32px]">
              Grow&nbsp;
            </span>
            <span className="font-bold text-brown-70 text-[32px]">Story</span>를
          </div>
          <div className="flex flex-col items-center font-bold text-brown-90 text-3xl">
            <span>이용해 주셔서 감사합니다.</span>
            <span>다음에 또 놀러 오세요!</span>
          </div>
          <div>
            <CommonButton
              type="button"
              size="md"
              children="닫기"
              className="w-[155px] h-[52px] text-[24px] mt-7"
              onClose={allCloseData}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
