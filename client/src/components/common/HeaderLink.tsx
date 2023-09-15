'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { HEADER_LINK_CONTENT } from '@/constants/contents';

interface HeaderLinkProps {
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
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={location}
        className={`flex justify-center items-center font-bold border-[3px] rounded-lg ${HEADER_LINK_STYLE[content]} bg-contain bg-center ${HEADER_LINK_BG[content]} px-[10px] py-[3px] text-base whitespace-nowrap`}>
        {HEADER_LINK_CONTENT[title]}
      </Link>
    </motion.div>
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
