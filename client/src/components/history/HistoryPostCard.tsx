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
    <div className="flex flex-col items-center justify-center w-[200px] h-[175px] rounded-lg border-2 border-brown-50 bg-brown-10 shadow-outer/down">
      <img
        src={imageUrl}
        className="w-[121px] h-[92px] rounded-lg"
        alt="post_image"
      />
      <div className="text-sm font-bold mt-2 mb-[17px]">{title}</div>
      <div className="w-full flex justify-start gap-3">
        <div className="flex justify-center items-center gap-[6px] ml-3">
          <img src="/assets/img/like.svg" />
          <div>{likes}</div>
        </div>
        <div className="flex justify-center items-center gap-[6px]">
          <img src="/assets/img/comment.svg" />
          <div>{comment}</div>
        </div>
      </div>
    </div>
  );
}
