import useLeafsStore from '@/stores/leafsStore';
import useLeafStore from '@/stores/leafStore';
import useGardenModalStore from '@/stores/gardenModalStore';

import CommonButton from './CommonButton';
import Modal from './Modal';
import ModalPortal from './ModalPortal';

interface ShareModalProps {
  location: 'leafs' | 'leaf' | 'garden';
}
export default function ShareModal({ location }: ShareModalProps) {
  const {
    modalClose: leafsModalClose,
    setModalCategory: setLeafsModalCategory,
  } = useLeafsStore();
  const { modalClose: leafModalClose, setModalCategory: setLeafModalCategory } =
    useLeafStore();
  const { close: gardenModalClose, changeType } = useGardenModalStore();

  const handleModalCancel = () => {
    if (location === 'leafs') {
      setLeafsModalCategory(null);
      leafsModalClose();
    }
    if (location === 'leaf') {
      setLeafModalCategory(null);
      leafModalClose();
    }
    if (location === 'garden') {
      changeType(null);
      gardenModalClose();
    }
  };
  return (
    <ModalPortal>
      <Modal className="w-full max-w-[400px] mx-4 shadow-outer/down">
        <div className="flex flex-col justify-center pt-6 pb-4 px-4 min-w-[352px]">
          <p className="text-center font-bold text-[1.5rem] leading-8 text-brown-70 break-wrods mb-4">
            현재 페이지 주소가
            <br />
            복사되었습니다.
          </p>
          <p className="text-center font-bold text-[1.5rem] leading-8 text-brown-90 break-words mb-5">
            다른 사람에게 <b className="text-brown-60">공유해보세요!</b>
          </p>
          <CommonButton
            type="button"
            size="md"
            onClick={handleModalCancel}
            className="mx-auto">
            확인
          </CommonButton>
        </div>
      </Modal>
    </ModalPortal>
  );
}
