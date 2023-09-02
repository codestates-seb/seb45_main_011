import { DefaultProps } from '@/types/common';
import Image from 'next/image';

interface LogoProps extends DefaultProps {
  size: 'small' | 'medium' | 'large';
}

type Size = {
  readonly width: number;
  readonly height: number;
};

interface Logo {
  small: Size;
  medium: Size;
  large: Size;
}

export default function Logo({ size }: LogoProps) {
  return (
    <div>
      <Image
        src="assets/img/logo.svg"
        alt="로고"
        className={LOGO_STYLE[size]}
        width={LOGO_SIZE[size].width}
        height={LOGO_SIZE[size].height}
        priority
      />
    </div>
  );
}

const LOGO_SIZE: Logo = {
  small: {
    width: 76,
    height: 44,
  },
  medium: {
    width: 138,
    height: 80,
  },
  large: {
    width: 297,
    height: 180,
  },
};

const LOGO_STYLE = {
  small: 'w-full max-w-[75px]',
  medium: 'w-full max-w-[137px]',
  large: 'w-full max-w-[296px]',
};
