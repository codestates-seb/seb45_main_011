import { motion } from 'framer-motion';
import Image from 'next/image';

interface HistoryPostCardProps {
  imageUrl: string;
  title: string;
  likes: number;
  comment: number;
}

export default function HistoryPostCard({
  imageUrl,
  title,
  likes,
  comment,
}: HistoryPostCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center w-[200px] h-[175px] rounded-lg border-2 border-brown-50 bg-brown-10 shadow-outer/down">
      <div className="w-[121px] h-[92px] mb-2 mx-auto">
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="object-cover object-center w-full h-full border-2 border-brown-40 rounded-lg bg-brown-20"
            width={117}
            height={88}
            alt="post_image"
          />
        ) : (
          <Image
            src={'/assets/img/bg_default_post.png'}
            className="object-cover object-center w-full h-full border-2 border-brown-40 rounded-lg bg-brown-20"
            width={117}
            height={88}
            alt="post_image"
          />
        )}
      </div>

      <div className="w-[180px] mb-1">
        <p className="text-sm leading-[0.875rem] text-brown-80 font-bold text-ellipsis overflow-hidden whitespace-nowrap mb-1 px-5 text-center">
          {title}
        </p>
      </div>

      <div className="w-full flex justify-start gap-3 mt-1">
        <div className="flex justify-center items-center gap-[6px] ml-3 mb-1">
          <img src="/assets/img/like.svg" />
          <div>{likes}</div>
        </div>

        <div className="flex justify-center items-center gap-[6px] mb-1">
          <img src="/assets/img/comment.svg" />
          <div>{comment}</div>
        </div>
      </div>
    </motion.div>
  );
}
