'use client';

import Link from 'next/link';

import { HEADER_LINK_CONTENT } from '@/constants/contents';

interface HeaderLinkProps {
  location: string;
  content: 'activity' | 'auth';
  title: 'garden' | 'community' | 'leafCard' | 'signin' | 'logout';
  paramsId?: string;
}

export default function HeaderLink({
  location,
  content,
  title,
  paramsId,
}: HeaderLinkProps) {
  return (
    <div>
      <Link
        href={`${location}/${paramsId}`}
        className={`flex justify-center items-center font-bold border-[3px] rounded-lg ${HEADER_LINK_STYLE[content]} bg-contain bg-center ${HEADER_LINK_BG[content]} px-[10px] py-[3px] text-base whitespace-nowrap hover:scale-105 transition-transform`}>
        {HEADER_LINK_CONTENT[title]}
      </Link>
    </div>
  );
}

const HEADER_LINK_BG = {
  activity: `bg-[url('/assets/img/bg_wood_dark.png')]`,
  auth: `bg-[url('/assets/img/bg_wood_light.png')]`,
};

const HEADER_LINK_STYLE = {
  activity: `border-brown-70 text-brown-10`,
  auth: `border-brown-50 text-brown-40`,
};
