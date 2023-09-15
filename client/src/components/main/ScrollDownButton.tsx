import Image from 'next/image';
import { DefaultProps, addPrefixToHandler } from '@/types/common';
import { twMerge } from 'tailwind-merge';

interface ScrollDownButtonProps
  extends addPrefixToHandler<any, 'on'>,
    DefaultProps {}

export default function ScrollDownButton({
  className,
  ...props
}: ScrollDownButtonProps) {
  const handleClick = Object.values(props)[0];

  return (
    <button onClick={handleClick}>
      <Image
        src={'/assets/icon/scroll_down.svg'}
        alt="아래 스크롤 버튼"
        width={28}
        height={51}
        className={twMerge(
          'common-drop-shadow hover:scale-110 hover:transition-transform',
          className,
        )}
      />
    </button>
  );
}
