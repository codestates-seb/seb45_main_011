import { DefaultProps } from '@/types/common';

interface LeafNameProps extends DefaultProps {
  name: string;
}

export default function LeafName({ name }: LeafNameProps) {
  return (
    <p className="px-3 py-2 bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat rounded-lg border-2 border-brown-70 text-[1rem] font-normal text-brown-10 mb-[1px]">
      {name}
    </p>
  );
}
