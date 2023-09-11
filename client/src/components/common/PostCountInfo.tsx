import Image from 'next/image';

interface PostCountInfoProps {
  likesNum: number;
  commentNum: number;
  isLike?: boolean;
  usage: 'board' | 'post';
}

export default function PostCountInfo({
  likesNum,
  commentNum,
  isLike,
  usage,
}: PostCountInfoProps) {
  return (
    <div className="flex gap-3">
      {usage === 'post' ? (
        <span className="flex gap-[0.375rem]" role="button" onClick={() => {}}>
          {isLike ? (
            <Image
              src="/assets/img/like.svg"
              alt="좋아요 개수"
              width={19}
              height={16}
            />
          ) : (
            // 좋아요 체크 안된 이미지 어떻게??
            <Image
              src="/assets/img/like.svg"
              alt="좋아요 개수"
              width={19}
              height={16}
            />
          )}
          {likesNum}
        </span>
      ) : (
        <span className="flex gap-[0.375rem]">
          <Image
            src="/assets/img/like.svg"
            alt="좋아요 개수"
            width={19}
            height={16}
          />

          {200}
        </span>
      )}

      <span className="flex gap-[0.375rem] text-base leading-4 text-brown-70">
        <Image
          src="/assets/img/comment.svg"
          alt="댓글 개수"
          width={19}
          height={16}
        />
        {commentNum}
      </span>
    </div>
  );
}
