import { DefaultProps } from '@/types/common';
import { twMerge } from 'tailwind-merge';

interface NoImageProps extends DefaultProps {
  location: 'diary' | 'imageUpload';
}

export default function NoImage({ location }: NoImageProps) {
  return (
    // width 100% 추가
    <div
      className={`w-full flex flex-col justify-center items-center bg-brown-10 border-brown-50 border-2 shadow-outer/down rounded-[12px] 
      ${NO_IMAGE_STYLE[location].topContainer}`}>
      <div className="flex flex-col justify-center items-center">
        <h1
          className={`font-bold text-brown-50 mb-2 ${NO_IMAGE_STYLE[location].heading}`}>
          No Image
        </h1>
        <p
          className={`font-bold text-brown-70 text-center ${NO_IMAGE_STYLE[location].paragraph}`}>
          {location === 'imageUpload' && '이미지를 등록해주세요!'}
        </p>
        {location === 'imageUpload' && (
          <img src="/assets/img/snow_tree.svg" alt="No Image" />
        )}
      </div>
    </div>
  );
}

const NO_IMAGE_STYLE = {
  diary: {
    topContainer: 'max-w-[106px] h-[81px] ',
    heading: 'text-[12px] leading-4',
    paragraph: 'text-[10px] mb-3',
  },
  imageUpload: {
    topContainer: 'max-w-[232px] h-[180px]',
    heading: 'text-[24px] leading-6',
    paragraph: 'mb-6',
  },
};
