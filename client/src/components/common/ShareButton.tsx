import Image from 'next/image';
import { usePathname } from 'next/navigation';

import useLeafsStore from '@/stores/leafsStore';
import useLeafStore from '@/stores/leafStore';
import CommonButton from './CommonButton';

interface ShareButtonProps {
  location: 'leafs' | 'leaf';
  position: 'top' | 'bottom';
}

export default function ShareButton({ location, position }: ShareButtonProps) {
  const url = usePathname();

  const { modalOpen: leafsModalOpen, setModalCategory: setLeafsModalCategory } =
    useLeafsStore();

  const { modalOpen: leafModalOpen, setModalCategory: setLeafModalCategory } =
    useLeafStore();

  const shareUrl = () => {
    const base = 'http://localhost:3000';
    const links = base + url;

    navigator.clipboard.writeText(links);

    if (location === 'leafs') {
      setLeafsModalCategory('share');
      leafsModalOpen();
    }

    if (location === 'leaf') {
      setLeafModalCategory('share');
      leafModalOpen();
    }
  };

  if (position === 'top')
    return (
      <button
        className="absolute top-[36px] right-[36px] w-[40px] h-[40px] bg-brown-50 rounded-[50%] border-2 border-brown-70 shadow-outer/down hover:scale-110 transition-transform  max-[550px]:hidden"
        onClick={shareUrl}>
        <Image
          className="relative left-[10px]"
          src="/assets/icon/share.svg"
          width={16}
          height={18}
          alt="공유하기"
        />
      </button>
    );
  if (position === 'bottom')
    return (
      <CommonButton
        size="md"
        type="button"
        onClick={shareUrl}
        className="hidden w-fit hover:scale-105 hover:transition-transform max-[550px]:inline">
        공유하기
      </CommonButton>
    );
}
