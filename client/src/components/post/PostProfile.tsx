'use client';

import { BoardUserDataInfo } from '@/types/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BoardProfile({
  userId,
  displayName,
  profileImageUrl,
  grade,
}: BoardUserDataInfo) {
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
        <span className="text-xl leading-5 font-bold text-brown-80">
          {displayName}
        </span>
        <span className="text-[1rem] leading-4 font-normal text-brown-80">
          {grade}
        </span>
      </div>
    </div>
  );
}
