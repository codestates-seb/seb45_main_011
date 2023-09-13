import { twMerge } from 'tailwind-merge';

import LoadingMessage from './LoadingMessage';
import Screws from './Screws';

import { DefaultProps } from '@/types/common';

interface LoadingNoticeProps extends DefaultProps {
  isTransparent: boolean;
}

export default function LoadingNotice({
  isTransparent,
  className,
}: LoadingNoticeProps) {
  return (
    <>
      {isTransparent ? (
        <div className={className}>
          <LoadingMessage />
        </div>
      ) : (
        <div
          className={twMerge(
            'relative flex justify-center items-center w-[280px] h-[240px] border-gradient rounded-xl bg-repeat shadow-outer/down',
            className,
          )}>
          <LoadingMessage />
          <Screws />
        </div>
      )}
    </>
  );
}
