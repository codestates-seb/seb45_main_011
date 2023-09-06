import Link from 'next/link';
import { SIGN_LINK_TO } from '@/constants/contents';

interface SignLinkProps {
  type: 'signin' | 'signup';
  route: '/signin' | '/signup';
  text: 'signinText' | 'signupText';
}

export default function SignLink({ type, route, text }: SignLinkProps) {
  return (
    <div className="text-brown-90">
      <Link href={route}>
        {SIGN_LINK_TO[text]}
        <span className="font-bold">&nbsp;{SIGN_LINK_TO[type]}</span>
      </Link>
    </div>
  );
}
