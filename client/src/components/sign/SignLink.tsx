import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

import { SIGN_LINK_TO } from '@/constants/contents';

interface SignLinkProps extends DefaultProps {
  type: 'signin' | 'signup';
  route: '/signin' | '/signup';
  text: 'signinText' | 'signupText';

  onLinkTo?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SignLink({
  type,
  route,
  text,
  onLinkTo,
  className,
}: SignLinkProps) {
  return (
    <div className={twMerge('text-brown-80', className)} onClick={onLinkTo}>
      <Link href={route}>
        {SIGN_LINK_TO[text]}

        <p className="inline-block font-bold hover:scale-110 transition-transform">
          &nbsp;{SIGN_LINK_TO[type]}
        </p>
      </Link>
    </div>
  );
}
