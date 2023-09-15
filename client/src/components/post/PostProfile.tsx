'use client';

import Image from 'next/image';
import Link from 'next/link';

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
      className={`flex gap-3 items-center ${PROFILE_STYLE[usage].container}`}>
      <div className="w-[44px] h-[44px] flex justify-center items-center border-[3px] rounded-[50%] border-brown-50 common-drop-shadow overflow-hidden max-[500px]:w-[38px] max-[500px]:h-[38px]">
        <Image
          className=" object-cover"
          src={profileImageUrl || '/assets/img/bg_default_profile.png'}
          alt={`${displayName}의 프로필 사진`}
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col gap-2 max-[500px]:gap-1">
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
    container: 'max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-1',
    displayName:
      'text-xl leading-5 font-bold  max-[500px]:text-[1rem] max-[500px]:leading-[1rem]',
    grade:
      'text-[1rem] leading-4 font-normal max-[500px]:text-[0.875rem] max-[500px]:leading-[0.875rem]',
  },
  comment: {
    container: 'max-[550px]:gap-1',
    displayName:
      'text-[1rem] leading-[1rem] font-bold  max-[500px]:text-[0.85rem] max-[500px]:leading-[0.85rem]',
    grade:
      'text-[0.75rem] leading-[0.75rem] font-normal  max-[500px]:text-[0.675rem] max-[500px]:leading-[0.675rem]',
  },
};
