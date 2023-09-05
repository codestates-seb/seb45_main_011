'use client';

import { useRouter } from 'next/navigation';
import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/modalStore';

import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';

export default function ConnectLeafModal() {
  const router = useRouter();
  const { plants, infoTarget, setPlants, setInfoTarget } = useGardenStore();
  const {
    isLeafExistModalOpen,
    isNoLeafExistModalOpen,
    setIsLeafExistModalOpen,
    setIsNoLeafExistModalOpen,
    setIsSelectLeafModalOpen,
  } = useModalStore();

  const handleClose = () => {
    setIsLeafExistModalOpen(false);
    setIsNoLeafExistModalOpen(false);
  };

  const handleConnect = () => {
    setIsLeafExistModalOpen(false);
    setIsNoLeafExistModalOpen(false);
    setIsSelectLeafModalOpen(true);
  };

  const handleDisConnect = () => {
    // fetch 가능성
    const newPlants =
      infoTarget &&
      plants.map((plant) =>
        plant.plantObjId === infoTarget.plantObjId
          ? {
              ...plant,
              leafDto: null,
            }
          : plant,
      );

    setPlants(newPlants || plants);
    setInfoTarget(null);
    setIsLeafExistModalOpen(false);
  };

  const handleBrowse = () => {
    router.push(`/leaf/1/${infoTarget?.plantObjId}`);

    setIsLeafExistModalOpen(false);
  };

  const handleCreate = () => {
    // 추후 사용자 ID로 변경
    router.push('/leaf/add/1');

    setIsNoLeafExistModalOpen(false);
  };

  return (
    <ModalPortal>
      <Modal>
        <div className="flex flex-col gap-8 min-w-[320px] pt-10 pb-8">
          <section className="flex flex-col gap-4 w-fit mx-auto">
            {isLeafExistModalOpen && (
              <>
                <CommonButton
                  handleConnect={handleConnect}
                  usage="button"
                  size="lg">
                  식물 카드 교체
                </CommonButton>
                <CommonButton
                  handleDisconnect={handleDisConnect}
                  usage="button"
                  size="lg">
                  식물 카드 해제
                </CommonButton>
                <CommonButton
                  handleBrowse={handleBrowse}
                  usage="button"
                  size="lg">
                  식물 카드 열람
                </CommonButton>
              </>
            )}
            {isNoLeafExistModalOpen && (
              <>
                <CommonButton
                  handleConnect={handleConnect}
                  usage="button"
                  size="lg">
                  식물 카드 연결
                </CommonButton>
                <CommonButton
                  handleCreate={handleCreate}
                  usage="button"
                  size="lg">
                  식물 카드 생성
                </CommonButton>
              </>
            )}
          </section>
          <button
            onClick={handleClose}
            className={`w-fit mx-auto px-[14px] py-[14px] border-[3px] border-brown-40 rounded-lg bg-contain bg-repeat bg-[url('/assets/img/bg_wood_light.png')] text-brown-40 font-bold text-xl leading-3 shadow-outer/down`}>
            닫기
          </button>
        </div>
      </Modal>
    </ModalPortal>
  );
}
