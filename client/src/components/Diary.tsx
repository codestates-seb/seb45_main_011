import Image from 'next/image';

import { DiaryInfo } from '@/types/common';

import ControlButton from './common/ControlButton';

interface FormatContentProps {
  content: string;
  className: string;
}

// 서버에서 string 타입으로 html을 받아온다고 가정하고 삽입하는 함수.
// dangerouslySetInnerHTML은 react의 가상 DOM을 우회하는 것이라 성능 이슈도 있고 크로스 사이트 스크립팅 공격에 취약하다는데 다른 방법이 있을까요?
function FormatContent({ content, className }: FormatContentProps) {
  return (
    <p className={className} dangerouslySetInnerHTML={{ __html: content }}></p>
  );
}

export default function Diary({ item }: { item: DiaryInfo }) {
  // 서버로부터 받은 줄바꿈(\n)을 <br/> 태그로 변환
  const replaceContent = item?.content.replace(/\n/g, '<br/>');

  const startDay = new Date(item.date);
  const [month, day] = [startDay.getMonth() + 1, startDay.getDate()];

  return (
    <li className="w-full max-w-[414px]">
      <div className="flex justify-between">
        <span className="pt-2 font-bold text-[1.5rem] text-brown-80">
          {month + '/' + day}
        </span>
        <div className="relative grid grid-cols-1 gap-3 w-full max-w-[331px] max-h-[137px] p-4 pb-[0.9rem] bg-brown-10 border-2 border-brown-50 rounded-lg">
          <div className="absolute right-[10px] top-[10px] flex gap-2">
            <ControlButton
              usage="edit"
              // handleDiaryEdit={handleDiaryAddAndEdit}
            />
            <ControlButton
              usage="delete"
              // handleDiaryDelete={handleDiaryDelete}
            />
          </div>
          <p className="text-[0.875rem] font-bold text-brown-80 ">
            {item.title}
          </p>
          <div className="flex gap-3">
            <Image
              className="rounded-lg w-[106px] h-[81px]"
              src={item.imgUrl}
              alt=""
              width={106}
              height={81}
            />
            <FormatContent
              className="max-w-[131px] font-normal text-xs"
              content={replaceContent}></FormatContent>
          </div>
        </div>
      </div>
    </li>
  );
}
