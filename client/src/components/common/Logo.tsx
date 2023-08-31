import Image from 'next/image';

type SizeType = 'small' | 'medium' | 'large';

type Size = {
  readonly width: number;
  readonly height: number;
};

interface Logo {
  small: Size;
  medium: Size;
  large: Size;
}

export default function Logo({ size }: { size: SizeType }) {
  return (
    <div>
      <Image
        src="assets/img/logo.svg"
        alt="로고"
        className={containerClass[size]}
        width={LOGO_SIZE[size].width}
        height={LOGO_SIZE[size].height}
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

const containerClass = {
  small: 'w-full max-w-[74px]',
  medium: 'w-full max-w-[138px]',
  large: 'w-full max-w-[297px]',
};
