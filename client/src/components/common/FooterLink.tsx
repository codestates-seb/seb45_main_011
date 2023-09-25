'use client';

import { FOOTER_LINK } from '@/constants/contents';
import Link from 'next/link';

interface FooterLinkProps {
  repositories:
    | 'dogyeong'
    | 'minseok'
    | 'dohyeong'
    | 'seungtae'
    | 'hanbin'
    | 'doyeon';

  member?: string;
}

export default function FooterLink({ repositories, member }: FooterLinkProps) {
  return (
    <Link
      href={FOOTER_LINK[repositories]}
      className="hover:text-yellow-50 hover:scale-110 transition-all"
      target="_blank"
      rel="noreferrer noopener">
      {member}
    </Link>
  );
}
