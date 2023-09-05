'use client';

import { useRouter } from 'next/navigation';

import useGardenStore from '@/stores/gardenStore';
import useGardenModalStore from '@/stores/gardenModalStore';

import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';

export default function LeafExistModal() {
  const router = useRouter();

  const { plants, infoTarget, setPlants, changeInfoTarget } = useGardenStore();
  const { changeType, close } = useGardenModalStore();

  const handleConnect = () => changeType('selectLeaf');

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
    changeInfoTarget(null);

    close();
  };

  const handleBrowse = () => {
    router.push(`/leaf/1/${infoTarget?.plantObjId}`);

    close();
  };

  const handleClose = () => close();

  return (
    <ModalPortal>
      <Modal>
        <div className="flex flex-col gap-8 min-w-[320px] pt-10 pb-8">
          <section className="flex flex-col gap-4 w-fit mx-auto">
            <CommonButton onConnect={handleConnect} type="button" size="lg">
              식물 카드 교체
            </CommonButton>
            <CommonButton
              onDisconnect={handleDisConnect}
              type="button"
              size="lg">
              식물 카드 해제
            </CommonButton>
            <CommonButton onBrowse={handleBrowse} type="button" size="lg">
              식물 카드 열람
            </CommonButton>
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
