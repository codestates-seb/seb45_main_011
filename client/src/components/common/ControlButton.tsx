import { DefaultProps } from '@/types/common';
import { CONTROL_BUTTON_TITLES } from '@/constants/contents';

interface ControlButtonProps extends DefaultProps {
  usage: 'edit' | 'delete';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ControlButton({ usage }: ControlButtonProps) {
  return (
    <button
      type="button"
      title={CONTROL_BUTTON_TITLES[usage]}
      className={`w-6 h-6 border-2 border-brown-70 rounded-full bg-no-repeat bg-center shadow-inner/top ${BUTTON_STYLE[usage]}`}
    />
  );
}

const BUTTON_STYLE = {
  edit: `bg-yellow-50 bg-[url('/assets/icon/edit.svg')]`,
  delete: `bg-red-50 bg-[url('/assets/icon/delete.svg')]`,
} as const;
