import ControlMenu from './PostContolButton';

interface DateAndControlProps {
  date: string;
  usage: 'post' | 'comment';
  boardId: number;
}

export default function DateAndControl({
  date,
  usage,
  boardId,
}: DateAndControlProps) {
  return (
    <div className="flex items-center gap-2 absolute z-10 right-[36px]">
      <span className="text-sm leading-[0.875rem] font-bold text-brown-80">
        {date}
      </span>
      <ControlMenu usage={usage} boardId={boardId} />
    </div>
  );
}
