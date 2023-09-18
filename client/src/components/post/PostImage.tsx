import Image from 'next/image';

interface PostImageProps {
  src?: string | null;
}

export default function PostImage({ src }: PostImageProps) {
  if (!src) return null;

  return (
    <div className="w-full max-w-[520px] rounded-lg overflow-hidden mx-auto mb-[24px]">
      <Image
        className="object-cover w-full object-center"
        src={src || '/assets/img/bg_default_post.png'}
        alt=""
        width={370}
        height={250}
      />
    </div>
  );
}
