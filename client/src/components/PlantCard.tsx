import Plant from './Plant';
import CommonButton from './common/CommonButton';

import { PlantInfo } from '@/types/common';
import { PLANT_SIZES, PLANT_CARD_BUTTON_CONTENTS } from '@/constants/contents';

interface PlantCardProps {
  usage: 'shop' | 'inventory';
  plantInfo: PlantInfo;
}

export default function PlantCard({ usage, plantInfo }: PlantCardProps) {
  const { name, korName, imageUrl, price } = plantInfo;

  const size = name.startsWith('building') ? 'lg' : 'sm';

  return (
    <li
      className={`flex flex-col gap-1 items-center w-[126px] border-2 border-brown-50 rounded-lg bg-repeat bg-[url('/assets/img/bg_paper.png')] font-bold shadow-outer/down ${PLANT_CARD_SIZE[usage]}`}>
      <Plant
        name={korName}
        imageUrl={imageUrl}
        className="w-[60px] h-[60px] mt-1 object-none"
      />
      <h3 className="text-base text-brown-90 leading-4">{korName}</h3>
      <p className="text-xs text-brown-70 leading-3">{PLANT_SIZES[size]}</p>
      {usage === 'shop' && (
        <p
          className={`h-5 pl-6 mt-2 bg-contain bg-left bg-no-repeat bg-[url('/assets/img/point.svg')] text-base text-brown-90 leading-5`}>
          {price}
        </p>
      )}
      <CommonButton usage="button" size="sm" className="my-[10px]">
        {PLANT_CARD_BUTTON_CONTENTS[usage]}
      </CommonButton>
    </li>
  );
}

const PLANT_CARD_SIZE = {
  shop: 'h-[188px]',
  inventory: 'h-[156px]',
} as const;
