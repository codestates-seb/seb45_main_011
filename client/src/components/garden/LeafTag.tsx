import { twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

interface LeafTagProps extends DefaultProps {
  name: string;
  style?: React.CSSProperties;
}

export default function LeafTag({ name, className, style }: LeafTagProps) {
  return (
    <span
      className={twMerge(
        'w-max h-fit px-3 py-[0.375rem] text-sm leading-4 text-brown-70 leaf-tag',
        className,
      )}
      style={style}>
      {name}
    </span>
  );
}
