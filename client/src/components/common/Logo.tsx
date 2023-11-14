import Image from 'next/image';
import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

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

export default function Logo({ size, className }: LogoProps) {
  return (
    <>
      <Link href="/" className={twMerge('block', className)}>
        <Image
          src="/assets/img/logo.svg"
          alt="로고"
          className={LOGO_STYLE[size]}
          width={LOGO_SIZE[size].width}
          height={LOGO_SIZE[size].height}
          style={{
            width: LOGO_SIZE[size].width,
            height: LOGO_SIZE[size].height,
          }}
          priority
        />
      </Link>
    </>
  );
}

const LOGO_SIZE: Logo = {
  small: {
    width: 58,
    height: 36,
  },
  medium: {
    width: 138,
    height: 80,
  },
  large: {
    width: 200,
    height: 121,
  },
};

const LOGO_STYLE = {
  small: 'min-w-[58px]',
  medium: 'min-w-[137px]',
  large: 'min-w-[200px]',
};
