import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  title: string;
  imageSrc: string;
  likesNum: number;
  commentsNum: number;
  postId: number;
}

export default function PostCard({
  title,
  imageSrc,
  likesNum,
  commentsNum,
  postId,
}: PostCardProps) {
  const router = useRouter();
  const navigateToPost = (postId: number) => {
    return router.push(`/post/${postId}`);
  };

  return (
    <div
      className="w-[200px] h-[175px] pt-[0.875rem] px-[0.625rem] pb-[0.625rem] flex flex-col bg-brown-10 border-2 border-brown-50 rounded-lg"
      role="button"
      onClick={() => navigateToPost(postId)}>
      <div className="w-[121px] h-[92px] rounded-lg overflow-hidden mb-2 mx-auto">
        <Image
          className="object-cover w-full h-full"
          src={imageSrc}
          alt=""
          width={131}
          height={102}
        />
      </div>
      <h2 className="text-center text-sm leading-[0.875rem] text-brown-80 font-bold mb-[17px]">
        {title}
      </h2>
      <div className="flex gap-3">
        <span className="flex gap-[0.375rem]">
          <Image
            src="/assets/img/like.svg"
            alt="좋아요 개수"
            width={19}
            height={16}
          />
          {likesNum}
        </span>
        <span className="flex gap-[0.375rem] text-base leading-4 text-brown-70">
          <Image
            src="/assets/img/comment.svg"
            alt="좋아요 개수"
            width={19}
            height={16}
          />
          {commentsNum}
        </span>
      </div>
    </div>
  );
}
