import Image from 'next/image';
import Link from 'next/link';

import useUserStore from '@/stores/userStore';

export default function AddLeafButton() {
  const userId = useUserStore((state) => state.userId);
  return (
    <Link href={`/leaf/add/${userId}`} className="w-full max-w-[200px]">
      <button
        type="button"
        className="flex justify-center items-center w-full max-w-[200px] h-40 bg-brown-20 border-4 border-dashed border-brown-70 rounded-xl shadow-outer/down">
        <Image
          src="/assets/img/plus.svg"
          alt="식물카드 추가"
          width={36}
          height={36}
        />
      </button>
    </Link>
  );
}
