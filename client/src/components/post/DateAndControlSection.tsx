import getDateFormat from '@/utils/getDateFormat';
import ControlMenu from './PostContolButton';

interface DateAndControlProps {
  date?: Date;
  usage: 'post' | 'comment';
  targetId: number;
  ownerId: number;
}

export default function DateAndControlSection({
  date,
  usage,
  targetId,
  ownerId,
}: DateAndControlProps) {
  if (!date) return null;

  const formattedDay = getDateFormat(date);

  return (
    <div className="flex items-center gap-2 absolute z-[1] right-[36px]">
      <span className="text-sm leading-[0.875rem] font-bold text-brown-80">
        {formattedDay}
      </span>
      <ControlMenu usage={usage} targetId={targetId} ownerId={ownerId} />
    </div>
  );
}
