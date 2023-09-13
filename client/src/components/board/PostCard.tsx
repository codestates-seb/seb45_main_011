import Image from 'next/image';
import Link from 'next/link';

import PostCountInfo from '../common/PostCountInfo';

interface PostCardProps {
  title: string;
  imageSrc?: string;
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
  return (
    <li>
      <Link
        href={`/post/${postId}`}
        className="w-[200px] h-[175px] pt-[0.875rem] px-[0.625rem] pb-[0.625rem] flex flex-col bg-brown-10 border-2 border-brown-50 rounded-lg overflow-hidden">
        <div className="w-[121px] h-[92px] rounded-lg overflow-hidden mb-2 mx-auto border-2 border-brown-40">
          <Image
            className="object-cover object-center w-full h-full"
            src={imageSrc || '/assets/img/bg_default_post.png'}
            alt=""
            width={131}
            height={102}
          />
        </div>
        <h2 className="text-center text-sm leading-[0.875rem] text-brown-80 font-bold mb-[17px]">
          {title}
        </h2>
        <PostCountInfo
          likesNum={likesNum}
          commentNum={commentsNum}
          usage="board"
        />
      </Link>
    </li>
  );
}
