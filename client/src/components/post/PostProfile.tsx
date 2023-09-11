'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PostProfileProps {
  userId: number;
  displayName: string;
  profileImageUrl: string;
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
  const router = useRouter();
  const navigateToHistory = () => router.push(`/history/${userId}`);

  return (
    <div
      className="flex gap-3 items-center"
      role="button"
      onClick={navigateToHistory}>
      <div className="w-[44px] h-[44px] border-[3px] rounded-[50%] border-brown-50 common-drop-shadow overflow-hidden">
        <Image
          src={profileImageUrl || '/assets/img/profile_hitmontop.png'}
          alt={`${displayName}의 프로필 사진`}
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className={`${TEXT_SIZE[usage].displayName} text-brown-80`}>
          {displayName}
        </span>
        <span className={`${TEXT_SIZE[usage].grade} text-brown-80`}>
          {grade}
        </span>
      </div>
    </div>
  );
}

const TEXT_SIZE = {
  post: {
    displayName: 'text-xl leading-5 font-bold',
    grade: 'text-[1rem] leading-4 font-normal',
  },
  comment: {
    displayName: 'text-[1rem] leading-[1rem] font-bold',
    grade: 'text-[0.75rem] leading-[0.75rem] font-normal',
  },
};
