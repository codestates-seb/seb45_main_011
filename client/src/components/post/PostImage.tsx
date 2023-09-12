import Image from 'next/image';

interface PostImageProps {
  src?: string;
}

export default function PostImage({ src }: PostImageProps) {
  return (
    <div className="w-[360px] h-[240px] rounded-lg overflow-hidden mx-auto mb-[24px]">
      <Image
        className="object-contain w-[360px] h-[240px] object-center"
        src={src || '/assets/img/bg_default_post.png'}
        alt=""
        width={370}
        height={250}
      />
    </div>
  );
}
