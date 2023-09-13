import { twMerge } from 'tailwind-merge';

import ErrorMessage from './ErrorMessage';
import Screws from './Screws';

import { DefaultProps } from '@/types/common';

interface ErrorNoticeProps extends DefaultProps {
  isTransparent: boolean;
}

export default function ErrorNotice({
  isTransparent,
  className,
}: ErrorNoticeProps) {
  return (
    <>
      {isTransparent ? (
        <div className={className}>
          <ErrorMessage />
        </div>
      ) : (
        <div
          className={twMerge(
            'relative flex justify-center items-center w-[328px] h-[240px] border-gradient rounded-xl bg-repeat shadow-outer/down',
            className,
          )}>
          <ErrorMessage />
          <Screws />
        </div>
      )}
    </>
  );
}
