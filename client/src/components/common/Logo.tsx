import { DefaultProps } from '@/types/common';
import Link from 'next/link';
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
    <>
      <Link href="/" className="block">
        <Image
          src="/assets/img/logo.svg"
          alt="로고"
          className={LOGO_STYLE[size]}
          width={LOGO_SIZE[size].width}
          height={LOGO_SIZE[size].height}
          priority
        />
      </Link>
    </>
  );
}

const LOGO_SIZE: Logo = {
  small: {
    width: 60,
    height: 36,
  },
  medium: {
    width: 138,
    height: 80,
  },
  large: {
    width: 260,
    height: 158,
  },
};

const LOGO_STYLE = {
  small: 'min-w-[60px]',
  medium: 'min-w-[137px]',
  large: 'min-w-[260px]',
};
