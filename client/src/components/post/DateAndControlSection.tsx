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
    <div
      className={`flex items-center gap-2 absolute z-[1] top-0 right-[20px] ${SECTION_STYLE[usage].container}`}>
      <span
        className={`text-sm leading-[0.875rem] font-bold text-brown-80 ${SECTION_STYLE[usage].dayText}`}>
        {formattedDay}
      </span>
      <ControlMenu usage={usage} targetId={targetId} ownerId={ownerId} />
    </div>
  );
}

const SECTION_STYLE = {
  post: {
    container:
      'max-[500px]:flex-col-reverse max-[500px]:items-end max-[500px]:right-[35px] max-[500px]:top-[10px]',
    dayText: 'max-[500px]:text-xs ',
  },
  comment: {
    container:
      'max-[500px]:flex-col-reverse max-[500px]:items-end max-[500px]:right-[25px] max-[500px]:top-[-5px] max-[500px]:gap-1',
    dayText: 'max-[500px]:text-[0.4rem] ',
  },
};
