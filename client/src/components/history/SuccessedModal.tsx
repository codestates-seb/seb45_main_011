'use client';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal } from '../common';

export default function SuccessedModal() {
  const router = useRouter();

  const { setClear } = useUserStore();
  const { close } = useModalStore();

  const allCloseData = () => {
    setClear();
    close();

    router.push('/');
  };

  return (
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
            className="py-2 px-4 text-[18px]"
            onClose={allCloseData}>
            닫기
          </CommonButton>
        </div>
      </div>
    </Modal>
  );
}
