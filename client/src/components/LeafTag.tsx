import { DefaultProps } from '@/types/common';

interface LeafTagProps extends DefaultProps {
  name: string;
}

export default function LeafTag({ name }: LeafTagProps) {
  return (
    <span className="px-3 py-[0.375rem] text-sm leading-4 text-brown-70 leaf-tag">
      {name}
    </span>
  );
}
