import ControlMenu from './ControlMenu';

import getDateFormat from '@/utils/getDateFormat';

interface DateAndControlProps {
  date?: Date;
  usage: 'post' | 'comment';
  targetId: string;
  ownerId: string;
  isOwner?: boolean;
}

export default function DateAndControlSection({
  date,
  usage,
  targetId,
  ownerId,
  isOwner,
}: DateAndControlProps) {
  if (!date) return null;

  const formattedDay = getDateFormat(date);

  return (
    <div
      className={`flex items-center  z-[1] ${SECTION_STYLE[usage].container} ${
        isOwner ? 'pr-11' : 'pr-0'
      }`}>
      <span
        className={`text-sm leading-[0.875rem] font-bold text-brown-80 ${SECTION_STYLE[usage].dayText}`}>
        {formattedDay}
      </span>
      {isOwner && (
        <ControlMenu usage={usage} targetId={targetId} ownerId={ownerId} />
      )}
    </div>
  );
}

const SECTION_STYLE = {
  post: {
    container: 'max-[500px]:pr-0',
    dayText: 'max-[500px]:text-[.7rem]',
  },
  comment: {
    container: 'max-[500px]:pr-0',
    dayText: 'max-[500px]:text-[0.4rem] ',
  },
};
