import Image from 'next/image';

interface PostImageProps {
  src?: string | null;
}

export default function PostImage({ src }: PostImageProps) {
  return (
    <div className="w-full max-w-[360px] rounded-lg overflow-hidden mx-auto mb-[24px]">
      <Image
        className="object-cover w-full h-[240px] object-center  max-[500px]:h-[160px]"
        src={src || '/assets/img/bg_default_post.png'}
        alt=""
        width={370}
        height={250}
      />
    </div>
  );
}
