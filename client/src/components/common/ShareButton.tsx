import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function ShareButton() {
  const url = usePathname();

  const shareUrl = () => {
    const base = 'http://localhost:3000';
    const links = base + url;

    navigator.clipboard.writeText(links);
  };

  return (
    <button
      className="absolute top-[36px] right-[36px] w-[40px] h-[40px] bg-brown-50 rounded-[50%] border-2 border-brown-70"
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
}
