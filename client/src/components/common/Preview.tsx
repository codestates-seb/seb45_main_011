import Image from 'next/image';

export default function Preview({ src }: { src: string }) {
  return (
    <div className=" w-full h-[180px] object-center object-cover max-w-[232px] bg-brown-20 border-brown-50 border-2 shadow-outer/down rounded-[12px] overflow-hidden">
      <Image
        src={src || ''}
        alt={''}
        width={242}
        height={190}
        className="object-cover object-center w-full h-[180px]"
      />
    </div>
  );
}
