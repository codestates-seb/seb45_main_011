import Image from 'next/image';

export default function HashTag({
  tag,
  index,
  handleDeleteClick,
}: {
  tag: string;
  index: number;
  handleDeleteClick: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-[7px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-2 border-brown-70 rounded text-xs leading-3 text-brown-10">
      {tag}
      <Image
        role="button"
        src={'/assets/icon/delete.svg'}
        alt="삭제 버튼"
        width={12}
        height={12}
        onClick={() => handleDeleteClick(index)}
      />
    </div>
  );
}
