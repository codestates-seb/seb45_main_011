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
      <Modal className="min-w-[312px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-3 px-6 py-8 text-[22px] max-[705px]:text-[18px]">
          <div className="font-bold text-brown-80 break-keep">
            그동안&nbsp;
            <span className="font-bold text-brown-60">Grow&nbsp;</span>
            <span className="font-bold text-brown-70">Story</span>를
          </div>
          <div className="flex flex-col items-center font-bold text-brown-80 break-keep">
            <span>이용해 주셔서 감사합니다.</span>
            <span className="mt-6">다음에 또 놀러 오세요!</span>
          </div>
          <div>
            <CommonButton
              type="button"
              size="sm"
              children="닫기"
              className="py-2 px-4 text-[18px]"
              onClose={allCloseData}
            />
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
