import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal, ModalPortal } from '@/components/common';

import { SHARE_MODAL_TEXT } from '@/constants/contents';

interface ShareModalProps {
  location: 'leafs' | 'leaf' | 'garden';
}
  
export default function ShareModal({ location }: ShareModalProps) {
  const { close, changeType } = useModalStore();

  const handleModalCancel = () => {
    changeType(null);
    close();
    return;
  };
    
  return (
    <ModalPortal>
      <Modal>
        <div className="flex flex-col justify-center pt-6 pb-4 px-5 w-[320px]">
          <p className="text-center font-bold text-[1.3rem] leading-8 text-brown-70 break-wrods mb-4">
            {SHARE_MODAL_TEXT.firstLine[0]}
            <br />
            {SHARE_MODAL_TEXT.firstLine[1]}
          </p>
          <p className="text-center font-bold text-[1.32rem] leading-8 text-brown-90 break-words mb-5">
            {SHARE_MODAL_TEXT.secondLine[0]}
            <b className="text-brown-60">{SHARE_MODAL_TEXT.secondLine[1]}</b>
          </p>
          <CommonButton
            type="button"
            size="md"
            onClick={handleModalCancel}
            className="mx-auto hover:scale-110 hover:transition-transform">
            {SHARE_MODAL_TEXT.button}
          </CommonButton>
        </div>
      </Modal>
    </ModalPortal>
  );
}
