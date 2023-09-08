import Image from 'next/image';

export default function Preview({ src }: { src: string }) {
  console.log(src);
  return (
    <div className="relative w-full h-[180px] object-center object-cover max-w-[232px] border-brown-50 border-2 shadow-outer/down rounded-[12px] overflow-hidden">
      <Image src={src || ''} alt={''} fill className="object-cover" />
    </div>
  );
}
