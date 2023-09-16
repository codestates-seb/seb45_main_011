'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import useGardenModalStore from '@/stores/gardenModalStore';
import useUserStore from '@/stores/userStore';

import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';

export default function NoLeafExistModal() {
  const router = useRouter();

  const { changeType, close } = useGardenModalStore();
  const { userId } = useUserStore();

  const handleConnect = () => changeType('selectLeaf');

  const handleCreate = () => {
    router.push(`/leaf/add/${userId}`);

    close();
  };

  return (
    <ModalPortal>
      <Modal>
        <div className="flex flex-col gap-8 min-w-[320px] pt-10 pb-8">
          <section className="flex flex-col gap-4 w-fit mx-auto">
            <CommonButton onConnect={handleConnect} type="button" size="lg">
              식물 카드 연결
            </CommonButton>
            <CommonButton onCreate={handleCreate} type="button" size="lg">
              식물 카드 생성
            </CommonButton>
          </section>
          <motion.button
            onClick={() => close()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-fit mx-auto px-[14px] py-[14px] border-[3px] border-brown-40 rounded-lg bg-contain bg-repeat bg-[url('/assets/img/bg_wood_light.png')] text-brown-40 font-bold text-xl leading-3 shadow-outer/down`}>
            닫기
          </motion.button>
        </div>
      </Modal>
    </ModalPortal>
  );
}
