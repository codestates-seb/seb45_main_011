'use client';

import Image from 'next/image';

import useClient from '@/hooks/useClient';
import useServiceInfoAnimation from '@/hooks/useServiceInfoAnimation';

import Screws from '../common/Screws';
import PageTitle from '../common/PageTitle';

interface ServiceInfoProps {
  order: number;
}

export default function ServiceInfo({ order }: ServiceInfoProps) {
  const isClient = useClient();
  const { section, infoContainer, leftInfo, rightInfo, bottomInfo } =
    useServiceInfoAnimation(order);

  const { title, sideContents, bottomContents, style, gifUrl } =
    SERVICE_INFO_VALUES[order];

  return (
    <section
      ref={section}
      className={`w-full min-w-[312px] max-w-[672px] ${
        isClient ? 'block' : 'hidden'
      }`}>
      <div ref={infoContainer} className="relative">
        <div className="relative border-gradient rounded-xl bg-[url('/assets/img/bg_wood_yellow.png')] shadow-container">
          <div className="flex flex-col items-center p-8 pb-12">
            <PageTitle text={title} className="px-5 py-2" />
            <div className="relative w-full aspect-video">
              <Image
                src={gifUrl}
                alt="서비스 동작 이미지"
                fill
                sizes="100%"
                className="mt-5 rounded-lg object-center object-cover shadow-outer/down"
              />
            </div>
          </div>
          <Screws />
        </div>
        <p
          ref={bottomInfo}
          className="mt-4 py-6 px-5 border-2 border-brown-50 rounded-xl bg-[url('/assets/img/bg_paper.png')] text-base font-bold text-brown-80 text-center break-keep shadow-outer/down max-[400px]:text-sm">
          {bottomContents}
        </p>
        {sideContents.map((contents, index) => (
          <p
            key={index}
            ref={index === 0 ? leftInfo : rightInfo}
            className={`hidden absolute max-w-[276px] h-fit py-4 px-5 border-2 border-brown-50 rounded-xl bg-[url('/assets/img/bg_paper.png')] text-base font-bold text-brown-60 text-center break-keep shadow-outer/down ${
              index === 0 ? style.left : style.right
            }`}>
            {contents}
          </p>
        ))}
      </div>
    </section>
  );
}

const SERVICE_INFO_VALUES = [
  {
    title: '나만의 정원 꾸미기!',
    sideContents: [
      <>
        키우는 식물을 관리하고
        <br />
        커뮤니티에 자랑하면
        <br />
        <span className="text-lg text-brown-80">포인트를 획득</span>할 수
        있어요.
      </>,
      <>
        획득한 포인트로
        <br />
        상점에서 아이템을 구매하고
        <br />
        <span className="text-lg text-brown-80">나만의 정원</span>을 꾸며
        보세요!
      </>,
    ],
    bottomContents: (
      <>
        <span className="inline-block mb-5 leading-4">
          키우는 식물을 관리하고 커뮤니티에 자랑하면{' '}
          <span className="text-lg text-red-50 max-[400px]:text-base">
            포인트를 획득
          </span>
          할 수 있어요!
        </span>
        <span className="inline-block leading-4">
          획득한 포인트로 상점에서 아이템을 구매하고{' '}
          <span className="text-lg text-green-50 max-[400px]:text-base">
            나만의 정원
          </span>
          을 꾸며 보세요!
        </span>
      </>
    ),
    style: {
      left: 'top-[170px] -left-[173px]',
      right: 'bottom-[68px] -right-[175px]',
    },
    gifUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}/main/garden.gif`,
  },
  {
    title: '모여라 식집사들!',
    sideContents: [
      <>
        <span className="text-lg text-brown-80">매주 좋아요 순위</span>에 따라
        <br />
        정원 꾸미기에 유용한
        <br />
        <span className="text-lg text-brown-80">포인트를 지급</span>한답니다!
      </>,
      <>
        게시판에 <span className="text-lg text-brown-80">식물을 자랑</span>
        하거나
        <br />
        식물 재배와 관련한
        <br />
        <span className="text-lg text-brown-80">질문을 남길 수 있어요.</span>
      </>,
    ],
    bottomContents: (
      <>
        <span className="inline-block mb-5 leading-4">
          게시판에{' '}
          <span className="text-lg text-green-50 max-[400px]:text-base">
            식물을 자랑
          </span>
          하거나 식물 재배와 관련한{' '}
          <span className="text-lg text-green-50 max-[400px]:text-base">
            질문을 남길 수 있어요.
          </span>
        </span>
        <span className="inline-block leading-4">
          <span className="text-lg text-red-50 max-[400px]:text-base">
            매주 좋아요 순위
          </span>
          에 따라 정원 꾸미기에 유용한{' '}
          <span className="text-lg text-red-50 max-[400px]:text-base">
            포인트를 지급
          </span>
          한답니다!
        </span>
      </>
    ),
    style: {
      left: 'bottom-[98px] -left-[163px]',
      right: 'top-[154px] -right-[172px]',
    },
    gifUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}/main/community.gif`,
  },
  {
    title: '손쉬운 식물 관리!',
    sideContents: [
      <>
        <span className="text-lg text-brown-80">식물 카드</span>를 등록하고
        <br />
        식물이 자라는 모습을
        <br></br>
        <span className="text-lg text-brown-80">일지로 기록</span>해보세요.
      </>,
      <>
        매일 자라는 내 식물들을
        <br />
        <span className="text-lg text-brown-80">손쉽고 재미있게</span>
        <br />
        관리할 수 있어요!
      </>,
    ],
    bottomContents: (
      <>
        <span className="inline-block mb-5 leading-4">
          <span className="text-lg text-green-50 max-[400px]:text-base">
            식물 카드
          </span>
          를 등록하고 식물이 자라는 모습을{' '}
          <span className="text-lg text-green-50 max-[400px]:text-base">
            일지로 기록
          </span>
          해보세요.
        </span>
        <span className="inline-block leading-4">
          매일 자라는 내 식물들을{' '}
          <span className="text-lg text-red-50 max-[400px]:text-base">
            손쉽고 재미있게
          </span>{' '}
          관리할 수 있어요!
        </span>
      </>
    ),
    style: {
      left: 'top-[155px] -left-[147px]',
      right: 'bottom-[95px] -right-[129px]',
    },
    gifUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}/main/card.gif`,
  },
];
