'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

interface PostProfileProps {
  userId: number;
  displayName: string;
  profileImageUrl: string | null;
  grade: string;
  usage: 'post' | 'comment';
}

export default function PostProfile({
  userId,
  displayName,
  profileImageUrl,
  grade,
  usage,
}: PostProfileProps) {
  return (
    <Link
      href={`/history/${userId}`}
      className={`flex gap-2 items-center ${PROFILE_STYLE[usage].container}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-[44px] h-[44px] flex justify-center items-center border-[3px] rounded-[50%] border-brown-50 common-drop-shadow overflow-hidden isolate max-[500px]:w-[38px] max-[500px]:h-[38px]">
        <Image
          className="h-full bg-brown-20 object-cover object-center isolate"
          src={profileImageUrl || '/assets/img/bg_default_profile.png'}
          alt={`${displayName}의 프로필 사진`}
          width={50}
          height={50}
          style={{ width: 50, height: 50 }}
        />
      </motion.div>
      <div className="flex flex-col gap-1 max-[500px]:gap-1">
        <span className={`${PROFILE_STYLE[usage].displayName} text-brown-80`}>
          {displayName}
        </span>
        <span className={`${PROFILE_STYLE[usage].grade} text-brown-80`}>
          {grade}
        </span>
      </div>
    </Link>
  );
}

const PROFILE_STYLE = {
  post: {
    container: '',
    displayName:
      'text-lg leading-5 font-bold  max-[500px]:text-[.8rem] max-[500px]:leading-[1rem]',
    grade:
      'text-[0.8rem] leading-4 font-normal max-[500px]:text-[0.7rem] max-[500px]:leading-[0.875rem]',
  },
  comment: {
    container: 'max-[550px]:gap-1',
    displayName:
      'text-[1rem] leading-[1rem] font-bold  max-[500px]:text-[0.75rem] max-[500px]:leading-[0.85rem]',
    grade:
      'text-[0.75rem] leading-[0.75rem] font-normal  max-[500px]:text-[0.65rem] max-[500px]:leading-[0.675rem]',
  },
};
