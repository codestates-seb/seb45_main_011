import ControlMenu from './PostContolButton';

interface DateAndControlProps {
  date: string;
  usage: 'post' | 'comment';
  targetId: number;
}

export default function DateAndControl({
  date,
  usage,
  targetId,
}: DateAndControlProps) {
  return (
    <div className="flex items-center gap-2 absolute z-10 right-[36px]">
      <span className="text-sm leading-[0.875rem] font-bold text-brown-80">
        {date}
      </span>
      <ControlMenu usage={usage} targetId={targetId} />
    </div>
  );
}
