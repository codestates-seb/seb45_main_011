import Image from 'next/image';

interface CommentProfileImage {
  src: string;
}

export default function CommentProfileImage({ src }: CommentProfileImage) {
  return (
    <div className="min-w-[38px] w-[44px] h-[44px] rounded-[50%] border-brown-10 border-[3px] overflow-hidden max-[560px]:w-[38px] max-[560px]:h-[38px] max-[500px]:hidden">
      <Image
        src={src || '/assets/img/profile_hitmontop.png'}
        alt="profile_img"
        className={`w-11 h-11 object-cover object-center `}
        width={44}
        height={44}
      />
    </div>
  );
}
