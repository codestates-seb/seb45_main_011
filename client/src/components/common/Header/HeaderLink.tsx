'use client';

import Link from 'next/link';
import { HEADER_LINK_CONTENT } from '@/constants/contents';
interface HeaderLinkProps {
  // constants 폴더에 url 추가하면 변경할 것
  location: string;
  content: 'activity' | 'auth';
  title: 'garden' | 'community' | 'leafCard' | 'signin' | 'logout';
}

export default function HeaderLink({
  location,
  content,
  title,
}: HeaderLinkProps) {
  return (
    <div>
      <Link
        href={location}
        className={`flex justify-center items-center font-bold border-[3px] rounded-lg ${HEADER_LINK_STYLE[content]} bg-center ${HEADER_LINK_BG[content]} px-[13px] py-[7.5px] bg-[length:44px] text-[20px] h-[44px]`}>
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