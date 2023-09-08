import Image from 'next/image';
import Link from 'next/link';

interface AddLeafButtonProps {
  userId: number;
}

export default function AddLeafButton({ userId }: AddLeafButtonProps) {
  return (
    <Link href={`/leaf/add/${userId}`} className="w-full max-w-[200px]">
      <button
        type="button"
        className="flex justify-center items-center w-full max-w-[200px] h-40 bg-brown-20 border-4 border-dashed border-brown-70 rounded-xl shadow-outer/down">
        <div className="relative w-[36px] h-[36px] overflow-hidden">
          <Image
            src="/assets/img/plus.svg"
            alt="식물카드 추가"
            fill
            className="object-cover"
          />
        </div>
      </button>
    </Link>
  );
}
