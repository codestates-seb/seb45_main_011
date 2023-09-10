import Link from 'next/link';
import { SIGN_LINK_TO } from '@/constants/contents';
import { DefaultProps } from '@/types/common';

interface SignLinkProps {
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
}: SignLinkProps) {
  return (
    <div className="text-brown-90" onClick={onLinkTo}>
      <Link href={route}>
        {SIGN_LINK_TO[text]}
        <span className="font-bold">&nbsp;{SIGN_LINK_TO[type]}</span>
      </Link>
    </div>
  );
}
